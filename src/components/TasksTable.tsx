'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EyeIcon, MinusCircle, Trash2, Search, FilterX, ClipboardList } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Task } from '@/payload-types'
import { Checkbox } from './ui/checkbox'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import UpdateTasks from './UpdateTasks'
import { toast } from 'sonner'
import { PaginationIconsOnly } from './TaskPagination'
import ViewTask from './ViewTask'

import TaskHeader from './Header'
import TaskFilters from './Filter'
import { EmptyState } from './EmptyState'
import TaskStats from './TaskStats'

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalItems = filteredTasks.length
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentTasks = filteredTasks.slice(startIndex, startIndex + rowsPerPage)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleRowsChange = (value: string) => {
    setRowsPerPage(parseInt(value))
    setCurrentPage(1)
  }

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedIds.length === tasks.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(tasks.map((t) => t.id))
    }
  }

  const handleDeleteAll = async () => {
    if (selectedIds.length === 0) return
    try {
      const query = selectedIds.map((id) => `where[id][in]=${id}`).join('&')
      const res = await fetch(`/api/tasks?${query}`, { method: 'DELETE' })
      if (res.ok) {
        setSelectedIds([])
        toast.success('Tasks deleted successfully!')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Task deleted successfully!')
      router.refresh()
    }
  }

  {
    /* EMPTY STATE */
  }
  {
    filteredTasks.length === 0 && (
      <div className="text-center py-20 text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-700 mb-4" />
        <p className="text-lg">No tasks found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-5 transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto my-10 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* HEADER SECTION */}
        <div className="bg-[#435d7d] dark:bg-slate-800 p-6 text-white">
          {/*  Analytics Section */}
          <TaskStats tasks={tasks} />
          {/* HEADER WITH ACTIONS */}
          <TaskHeader selectedCount={selectedIds.length} onDeleteAll={handleDeleteAll} />

          {/* FILTERS SECTION */}
          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white dark:bg-slate-900 overflow-x-auto w-full">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow className="hover:bg-transparent border-b dark:border-slate-800">
                <TableHead className="w-12 text-center">
                  <Checkbox
                    checked={selectedIds.length === tasks.length && tasks.length > 0}
                    onCheckedChange={toggleAll}
                    className="dark:border-slate-600"
                  />
                </TableHead>
                <TableHead className="font-bold dark:text-slate-200">Name</TableHead>
                <TableHead className="font-bold dark:text-slate-200">Description</TableHead>
                <TableHead className="font-bold dark:text-slate-200">Status</TableHead>
                <TableHead className="text-right font-bold pr-10 dark:text-slate-200">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors h-16"
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selectedIds.includes(task.id)}
                        onCheckedChange={() => toggleSelect(task.id)}
                        className="dark:border-slate-600"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-gray-700 dark:text-slate-300">
                      {task.title}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-500 dark:text-slate-400">
                      {task.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
                        ${task.status === 'todo' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' : ''}
                        ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : ''}
                        ${task.status === 'done' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' : ''}
                      `}
                        variant="outline"
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end items-center gap-2">
                        <ViewTask task={task} />
                        <div className="text-amber-500 hover:scale-110 transition-transform">
                          <UpdateTasks task={task} />
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-800">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2 dark:text-white">
                                <Trash2 className="text-red-500 h-5 w-5" /> Confirm Delete
                              </AlertDialogTitle>
                              <AlertDialogDescription className="dark:text-slate-400">
                                Are you sure you want to delete this task? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-full text-center border-none">
                    <EmptyState/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION SECTION */}
        <div className="p-4 border-t dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900">
          <PaginationIconsOnly
            totalItems={totalItems}
            itemsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsChange}
          />
        </div>
      </div>
    </div>
  )
}
