
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import { Edit2, MinusCircle, PlusCircle, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import TasksTable from '@/components/TasksTable'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const tasks = await payload.find({
    collection: 'tasks',
      pagination: false,
  })


  return (
    <div>
      <TasksTable tasks={tasks.docs}  />
    </div>
  )
}
