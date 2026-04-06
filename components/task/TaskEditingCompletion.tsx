"use client"

import { useTaskContext } from "./TaskContext"

export default function TaskEditingCompletion() {
  const taskLogic = useTaskContext()

  return (
    taskLogic.task.completed ? (
      <button
        className="py-1 px-1 text-sm bg-gray-200 rounded-lg hover:cursor-pointer transition-colors hover:bg-blue-500 hover:text-white"
        onClick={() => taskLogic.markTheTaskAsNotCompleted(taskLogic.task)}
      >
        Undone
      </button>
    ) : (
      <button
        className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-blue-500 hover:text-white"
        onClick={() => taskLogic.markTheTaskAsCompleted(taskLogic.task)}
      >
        Done
      </button>
    )
  )
}