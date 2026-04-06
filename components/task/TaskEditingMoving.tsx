"use client"

import { useListsContext } from "../list/ListsContext"
import { useTaskContext } from "./TaskContext"

export default function TaskEditingMoving() {
  const taskLogic = useTaskContext()
  const listsLogic = useListsContext()

  return (
    listsLogic.taskMoving ? (
      <>
        <button
          className={`py-1 px-1 text-sm ${taskLogic.task.completed ? "bg-gray-200" : "bg-gray-100"} rounded-lg hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white`}
          onClick={() => taskLogic.deleteTheTask(taskLogic.task)}
        >
          Delete
        </button>

        <button
          className={`py-1 px-1 text-sm ${taskLogic.task.completed ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 hover:bg-gray-200"} rounded-lg hover:cursor-pointer transition-colors`}
          onClick={() => taskLogic.stopSettingTheChosenTask(listsLogic.setTaskMoving, listsLogic.setChosenTask)}
        >
          Stop
        </button>

        <button
          className={`py-1 px-1 text-sm ${taskLogic.task.completed ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 hover:bg-gray-200"} rounded-lg hover:cursor-pointer transition-colors`}
          onClick={() => taskLogic.stopEditing(listsLogic.setTaskMoving, listsLogic.setChosenTask)}
        >
          Close
        </button>
      </>
    ) : (
      <>
        <button
          className={`py-1 px-1 text-sm ${taskLogic.task.completed ? "bg-gray-200" : "bg-gray-100"} rounded-lg hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white`}
          onClick={() => taskLogic.deleteTheTask(taskLogic.task)}
        >
          Delete
        </button>

        <button
          className={`py-1 px-1 text-sm ${taskLogic.task.completed ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 hover:bg-gray-200"} rounded-lg hover:cursor-pointer transition-colors`}
          onClick={() => taskLogic.setTheChosenTask(taskLogic.task, listsLogic.setTaskMoving, listsLogic.setChosenTask)}
        >
          Move
        </button>

        <button
          className={`py-1 px-1 text-sm ${taskLogic.task.completed ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 hover:bg-gray-200"} rounded-lg hover:cursor-pointer transition-colors`}
          onClick={() => taskLogic.setTaskEditing(false)}
        >
          Close
        </button>
      </>
    )
  )
}