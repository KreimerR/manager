"use client"

import { useTaskContext } from "./TaskContext"
import TaskEditing from "./TaskEditing"
import TaskTitleEditing from "./TaskTitleEditing"
import TaskInfo from "./TaskInfo"

export default function RenderedTask() {
  const taskLogic = useTaskContext()

  return (
    <div className={`
        flex justify-between items-center p-2 
        ${taskLogic.task.completed
        ? "bg-gray-100"
        : "bg-white"} 
        shadow-sm text-gray-700 rounded-2xl hover:cursor-pointer hover:outline-2 hover:outline-blue-500 relative h-[45px]
      `}
    >
      {taskLogic.taskEditing ? <TaskEditing /> : taskLogic.taskTitleEditing ? <TaskTitleEditing /> : <TaskInfo />}
    </div>
  )
}