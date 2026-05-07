'use client'

import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Field, FieldGroup } from './ui/field'
import { Textarea } from './ui/textarea'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function AddTasks() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('todo')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('name') as string,

      description: formData.get('description') as string,
      status: status,
    }
    if (!data.title) {
      toast.error('Task name is required!')
      setLoading(false)
      return
    }
    if (!data.description) {
      toast.error('Task description is required!')
      setLoading(false)
      return
    }
    if (data.description && data.description.length > 500) {
      toast.error('Description cannot exceed 500 characters!')
      setLoading(false)
      return
    }
    console.log(data)

    try {
      const res = await fetch(`/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setOpen(false)
        toast.success('Task added successfully!', {
          description: 'The task has been created.',
        })
        router.refresh()
      } else {
        console.error('Failed to add task')
      }
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#5cb85c] hover:bg-[#4cae4c]">Add Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription>
                Create a new task for your daily routine. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label className="mt-2.5">Task Name</Label>
                <Input id="name-1" name="name" placeholder="Enter task name" />
              </Field>
              <Field>
                <Label>Description</Label>
                <Textarea name="description" placeholder="Enter task description" />
              </Field>
              <Field>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
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
                {loading ? 'Saving...' : 'Save Task'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
