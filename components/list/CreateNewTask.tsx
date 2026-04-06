"use client"

import { useListContext } from "./ListContext"
import { useListsContext } from "./ListsContext"

export default function CreateNewTask() {
  const listLogic = useListContext()
  const listsLogic = useListsContext()

  return (
    <div className="w-full flex justify-between items-center pt-2">
      <button
        className="p-2 bg-blue-500 text-white hover:cursor-pointer transition-colors hover:bg-blue-600 rounded-2xl"
        onClick={listsLogic.taskMoving ? undefined : () => listLogic.createNewTask(listsLogic.boardId, listLogic.list._id)}
      >
        Add Task
      </button>

      <button
        className="text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300 p-2 rounded-2xl"
        onClick={listsLogic.taskMoving ? undefined : listLogic.stopCreatingNewTask}
      >
        Close
      </button>
    </div>
  )
}