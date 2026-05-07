import { Search, FilterX } from 'lucide-react'
import { Input } from './ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export default function TaskFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 group w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search Tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 w-full"
        />
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-auto">
        <TabsList className="bg-black/20 border border-white/10 p-1 text-white">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="todo" className="data-[state=active]:bg-amber-500 text-white">Todo</TabsTrigger>
          <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-500 text-white">In Progress</TabsTrigger>
          <TabsTrigger value="done" className="data-[state=active]:bg-emerald-500 text-white">Done</TabsTrigger>
        </TabsList>
      </Tabs>

      {(searchQuery || statusFilter !== 'all') && (
        <Button
          variant="ghost"
          onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
          className="text-white hover:bg-white/10 flex gap-2 items-center"
        >
          <FilterX size={16} /> Clear
        </Button>
      )}
    </div>
  )
}