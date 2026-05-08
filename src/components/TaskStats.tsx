

import { Task } from '@/payload-types'
import { CheckCircle2, Circle, Clock, LayoutDashboard } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function TaskStats({tasks} : {tasks: Task[]}) {
    const totalTasks = tasks.length
    const todoTasks = tasks.filter((t) => t.status === 'todo').length
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length
    const doneTasks = tasks.filter((t) => t.status === 'done').length   


    const chartData = [
        {name: 'To Do', value: todoTasks , color: '#8884d8'},
        {name: 'In Progress', value: inProgressTasks, color: '#82ca9d'},
        {name: 'Done', value: doneTasks, color: '#ffc658'},
    ]

    const stats = [
    { title: 'Total Tasks', value: totalTasks, icon: LayoutDashboard, color: 'text-slate-600' },
    { title: 'To Do', value: todoTasks, icon: Circle, color: 'text-amber-500' },
    { title: 'In Progress', value: inProgressTasks, icon: Clock, color: 'text-blue-500' },
    { title: 'Done', value: doneTasks, icon: CheckCircle2, color: 'text-emerald-500' },
  ]
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        {stats.map((stat, index) => (
          <Card key={index} className="dark:bg-slate-900 dark:border-slate-800 shadow-md transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium dark:text-slate-300">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">Current status</p>
            </CardContent>
          </Card>
        ))}

        <Card className="col-span-full dark:bg-slate-900 dark:border-slate-800 p-4">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Task Distribution</CardTitle>
        </CardHeader>
        <div className="h-50 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                stroke="#888888" 
              />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                stroke="#888888" 
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
