'use client'

import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TaskPaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: string) => void
}

export function PaginationIconsOnly({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange
}: TaskPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Ellipsis logic
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('ellipsis-start')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('ellipsis-end')
      pages.push(totalPages)
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t bg-gray-50/50 dark:bg-slate-900/50 dark:border-slate-800 gap-4 transition-colors">
      
      {/* Rows Per Page Select */}
      <div className="flex items-center gap-2">
        <Label htmlFor="rows-per-page" className="text-sm text-gray-600 dark:text-slate-400 whitespace-nowrap">
          Rows per page
        </Label>
        <Select value={itemsPerPage.toString()} onValueChange={onRowsPerPageChange}>
          <SelectTrigger className="w-20 h-9 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-200" id="rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" className="dark:bg-slate-900 dark:border-slate-800">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Showing Text */}
      <div className="hidden lg:block text-sm text-gray-600 dark:text-slate-400">
        Showing <b>{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</b> to{" "}
        <b>{Math.min(currentPage * itemsPerPage, totalItems)}</b> of <b>{totalItems}</b> entries
      </div>

      {/* Pagination Controls */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer dark:text-slate-200'}
            />
          </PaginationItem>

          {/* Dynamic Pages */}
          {pageNumbers.map((page, index) => {
            // Key ကို ပိုပြီး specific ဖြစ်အောင် index နဲ့ တွဲပေးလိုက်ခြင်းက key mismatch ကို အရှင်းပျောက်စေပါတယ်
            const itemKey = `pagin-item-${index}-${page}`

            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <PaginationItem key={itemKey}>
                  <PaginationEllipsis className="dark:text-slate-500" />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={itemKey}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page as number)
                  }}
                  className={currentPage === page 
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600" 
                    : "dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer dark:text-slate-200'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}