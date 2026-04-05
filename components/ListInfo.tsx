"use client"

import { useListContext } from "./ListContext"
import { useListsContext } from "./ListsContext"

export default function ListInfo() {
  const listLogic = useListContext()
  const listsLogic = useListsContext()

  return (
    <div className="flex justify-between items-center gap-3 pt-2">
      <button
        className="p-2 text-gray-700 bg-gray-200 hover:cursor-pointer transition-colors hover:bg-gray-300 rounded-2xl"
        onClick={listsLogic.taskMoving ? undefined : listLogic.startCreatingNewTask}
      >
        Add Task
      </button>

      <button
        className="p-2 text-gray-700 bg-gray-200 hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white rounded-2xl"
        onClick={listsLogic.taskMoving ? undefined : () => listLogic.deleteTheList(listLogic.list._id)}
      >
        Delete List
      </button>
    </div>
  )
}