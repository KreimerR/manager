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
          className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
          onClick={() => taskLogic.deleteTheTask(taskLogic.task)}
        >
          Delete
        </button>

        <button
          className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
          onClick={() => taskLogic.stopSettingTheChosenTask(listsLogic.setTaskMoving, listsLogic.setChosenTask)}
        >
          Stop
        </button>

        <button
          className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
          onClick={() => taskLogic.stopEditing(listsLogic.setTaskMoving, listsLogic.setChosenTask)}
        >
          Close
        </button>
      </>
    ) : (
      <>
        <button
          className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
          onClick={() => taskLogic.deleteTheTask(taskLogic.task)}
        >
          Delete
        </button>

        <button
          className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
          onClick={() => taskLogic.setTheChosenTask(taskLogic.task, listsLogic.setTaskMoving, listsLogic.setChosenTask)}
        >
          Move
        </button>

        <button
          className="py-1 px-1 text-sm bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
          onClick={() => taskLogic.setTaskEditing(false)}
        >
          Close
        </button>
      </>
    )
  )
}