"use client"

import { useListContext } from "./ListContext"
import { TaskType } from "@/types"
import Task from "./Task"

export default function Tasks() {
  const listLogic = useListContext()

  return (
    <div className="flex flex-col gap-2 p-1 max-h-[60vh] overflow-y-scroll">
      {listLogic.listTasks.map((task: TaskType) => {
        if (task.listId.toString() === listLogic.list._id.toString()) {
          return (
            <Task key={task._id} task={task} />
          )
        }
      })}

      {listLogic.newTask && (
        <input
          type="text"
          placeholder="Enter a title"
          className="p-2 bg-white text-gray-700 rounded-2xl shadow-lg resize-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => listLogic.setTitle(e.target.value)}
        />
      )}
    </div>
  )
}