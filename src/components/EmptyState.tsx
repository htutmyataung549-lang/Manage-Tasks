import { ClipboardList } from 'lucide-react'
import React from 'react'

export const EmptyState = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        {/* Icon with Soft Background and Glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 blur-2xl rounded-full" />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-sm">
            <ClipboardList className="h-8 w-8 text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-[320px] items-center mx-auto space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            No tasks found
          </h3>
          <p className="text-sm text-slate-500  dark:text-slate-400 leading-relaxed">
            It looks like you haven't added any tasks yet. Get started by creating your first task
            today.
          </p>
        </div>
      </div>
    </div>
  )
}
