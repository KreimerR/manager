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
        className="py-1 px-3 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
        onClick={() => taskLogic.setTaskEditing(true)}
      >
        Edit
      </button>
    </>
  )
}