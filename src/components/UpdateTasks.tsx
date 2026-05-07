'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from './ui/button'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Task } from '@/payload-types'
import { Edit2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
export default function UpdateTasks({ task }: { task: Task }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('name') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as string,
    }
    console.log('Update data:', data)

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setOpen(false)
        router.refresh()
      } else {
        console.error('Failed to update task')
      }
    } catch (error) {
      console.error('Failed to update task', error)
    } finally {
      setLoading(false)
      setOpen(false)
      toast.success('Task updated successfully!', {
        description: 'The task has been modified.',
      })
      router.refresh()
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* <Button className="bg-[#5cb85c] hover:bg-[#4cae4c]">Update Task</Button> */}
          <Button
            variant="ghost"
            size="icon"
            className="text-[#ffc107] hover:text-amber-600 hover:bg-amber-100 h-8 w-8"
          >
            <Edit2 size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
              <DialogDescription>
                Modify the task details. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label className="mt-2.5">Task Name</Label>
                <Input defaultValue={task.title} name="name" placeholder="Enter task name" />
              </Field>
              <Field>
                <Label>Description</Label>
                <Textarea
                  defaultValue={task.description || ''}
                  name="description"
                  placeholder="Enter task description"
                />
              </Field>
              <Field>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={task.status || ''} name="status">
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="todo">ToDo</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading} className="bg-[#5cb85c] hover:bg-[#4cae4c]">
                {loading ? 'Updating...' : 'Save Task'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
