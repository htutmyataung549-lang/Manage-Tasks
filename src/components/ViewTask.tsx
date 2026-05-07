'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, AlignLeft, Info, CalendarDays, Clock } from 'lucide-react'
import { Task } from '@/payload-types'

export default function ViewTaskDialog({ task }: { task: Task }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  
  const formatTime = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-8 w-8"
        >
          <Eye size={18} />
        </Button>
      </DialogTrigger>
      
      {/* Dialog Content background and border colors */}
      <DialogContent className="sm:max-w-125 dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 w-fit px-3 py-1 rounded-full text-xs font-semibold uppercase">
            <Info size={14} /> Task Details
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Status & Date Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Box 1: Status */}
            <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-800 space-y-1 transition-colors">
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500 tracking-wider">
                Status
              </span>
              <div className="flex">
                <Badge
                  className={`
                    capitalize
                    ${task.status === 'todo' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' : ''}
                    ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : ''}
                    ${task.status === 'done' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' : ''}
                  `}
                  variant="outline"
                >
                  {task.status}
                </Badge>
              </div>
            </div>

            {/* Box 2: Created At */}
            <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-800 space-y-1 transition-colors">
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500 tracking-wider">
                Created At
              </span>
              <div className="flex flex-col text-sm font-medium text-gray-700 dark:text-slate-300">
                <div className="flex items-center gap-1">
                  <CalendarDays size={14} className="text-gray-400 dark:text-slate-500" />
                  {formatDate(task.createdAt)}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                  <Clock size={12} />
                  {formatTime(task.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-slate-300 text-sm">
              <AlignLeft size={16} className="text-gray-400 dark:text-slate-500" />
              Description
            </div>
            <div className="p-4 bg-white dark:bg-slate-950 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 text-sm leading-relaxed min-h-24 transition-colors">
              {task.description || (
                <span className="italic text-gray-400 dark:text-slate-600">No description available.</span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t dark:border-slate-800 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="px-6 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}