"use client"

import { useListsContext } from "./ListsContext"

export default function NewList() {
  const listsLogic = useListsContext()

  return (
    listsLogic.newList ? (
      <div className="flex flex-col gap-2 p-2 bg-gray-200 rounded-2xl text-gray-700 font-[600] min-w-[250px] h-max shadow-lg">
        <input
          type="text"
          placeholder="Enter list name..."
          className="w-full p-2 text-gray-700 bg-white rounded-2xl"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => listsLogic.setInputValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="px-2 py-1 bg-blue-600 text-white hover:cursor-pointer transition-colors hover:bg-blue-700 rounded-2xl"
            onClick={() => listsLogic.createNewList(listsLogic.boardId)}
          >
            Add list
          </button>

          <button
            className="px-2 py-1 text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300 rounded-2xl"
            onClick={listsLogic.stopCreatingNewList}
          >
            Close
          </button>
        </div>
      </div>
    ) : (
      <button
        className="p-2 bg-gray-200 rounded-2xl text-gray-700 font-[600] min-w-[250px] h-max shadow-lg opacity-70 hover:cursor-pointer transition-colors hover:bg-gray-300"
        onClick={listsLogic.startCreatingNewList}
      >
        Add another list
      </button>
    )
  )
}