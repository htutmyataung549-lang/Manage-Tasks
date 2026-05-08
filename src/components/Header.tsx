import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MinusCircle } from 'lucide-react'
import ModeToggle from './ModeToggle'
import AddTasks from './AddTasks'
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

export default function TaskHeader({ selectedCount, onDeleteAll }: { selectedCount: number; onDeleteAll: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Manage <span className="font-light">Tasks</span>
      </h2>
      <div className="flex gap-3">
        <ModeToggle />
        {selectedCount > 0 && (
          <Badge variant="secondary" className="animate-in fade-in zoom-in">
            {selectedCount} Selected
          </Badge>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              disabled={selectedCount === 0}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8"
            >
              <MinusCircle className="mr-2 h-4 w-4" /> Bulk Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="dark:text-white">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="dark:text-slate-400">
                Permanently delete <b>{selectedCount}</b> tasks?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:bg-slate-800">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteAll} className="bg-red-600">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AddTasks />
      </div>
    </div>
  )
}