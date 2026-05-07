// import { Task } from "@/payload-types";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { MinusCircle } from "lucide-react";
// import AddTasks from "./AddTasks";
// import { Checkbox } from "./ui/checkbox";
// import UpdateTasks from "./UpdateTasks";


// export default function DeleteAll({tasks}: {tasks: Task[]}) {
//     const router = useRouter();
//     const [selectedIds, setSelectedIds] = useState<number[]>([]);

//     //Checkbos logic
//    const toggleSelect = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     )
//   }

//   const toggleAll = () => {
//     if(selectedIds.length === tasks.length) {
//         setSelectedIds([])
//       // Select all
//     } else {
//       // Deselect all
//       setSelectedIds(tasks.map((t) => t.id))
//     }
//   }

//   const handleDeleteAll = async () => {
//     if(selectedIds.length === 0) {
//         alert('Please select at least one task to delete.')
//     }
//     if(!confirm(`Are you sure you want to delete ${selectedIds.length} tasks?`)) {
//         // Construct the query string for bulk deletion
//         const query = selectedIds.map((id) => `ids[]=${id}`).join('&')
//         const res = await fetch(`/api/tasks?${query}`, {
//             method: 'DELETE',
//         })
//         if(res.ok) {
//             setSelectedIds([]) // Clear selection after deletion
//             router.refresh()
//         } else {
//             console.error('Failed to delete tasks')
//         }
//     }
//   }

// return (
//     <div className="w-full max-w-6xl mx-auto my-10 border rounded-lg shadow-md overflow-hidden">
//       {/* Header Section */}
//       <div className="bg-[#435d7d] p-5 flex justify-between items-center text-white">
//         <h2 className="text-2xl font-bold">Manage <b>Tasks</b></h2>
//         <div className="flex gap-2">
//           <Button 
//             onClick={handleDeleteAll}
//             className="bg-[#d9534f] hover:bg-[#c9302c]"
//             disabled={selectedIds.length === 0}
//           >
//             <MinusCircle className="mr-2 h-4 w-4" /> Delete All
//           </Button>
//           <AddTasks />
//         </div>
//       </div>

//       {/* Table Section */}
//       <table className="w-full text-left border-collapse">
//         <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
//           <tr>
//             <th className="p-4 border-b">
//               <Checkbox 
//                 checked={selectedIds.length === tasks.length && tasks.length > 0}
//                 onCheckedChange={toggleAll}
//               />
//             </th>
//             <th className="p-4 border-b">Task Name</th>
//             <th className="p-4 border-b">Status</th>
//             <th className="p-4 border-b text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.id} className="hover:bg-gray-50 border-b">
//               <td className="p-4">
//                 <Checkbox 
//                   checked={selectedIds.includes(task.id)}
//                   onCheckedChange={() => toggleSelect(task.id)}
//                 />
//               </td>
//               <td className="p-4 font-medium">{task.title}</td>
//               <td className="p-4 text-sm text-gray-600">{task.status}</td>
//               <td className="p-4 text-right">
//                 <div className="flex justify-end gap-2">
//                   <UpdateTasks task={task} />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }