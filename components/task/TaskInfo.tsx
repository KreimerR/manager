"use client"

import { useTaskContext } from "./TaskContext"

export default function TaskInfo() {
  const taskLogic = useTaskContext()

  return (
    <>
      <p
        className={`max-w-[150px] overflow-x-scroll ${taskLogic.task.completed && "line-through"}`}
        onClick={taskLogic.startEditingTaskTitle}
      >
        {taskLogic.task.title}
      </p>

      <button
        className={`py-1 px-3 ${taskLogic.task.completed ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 hover:bg-gray-200"} rounded-lg hover:cursor-pointer transition-colors`}
        onClick={() => taskLogic.setTaskEditing(true)}
      >
        Edit
      </button>
    </>
  )
}