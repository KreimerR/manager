"use client"

import Tasks from "./Tasks"
import { useState } from "react"
import addNewList from "@/actions/addNewList"
import { useRouter } from "next/navigation"

type Props = {
  lists: any
  tasks: any
  boardId: any
}

export default function List({ lists, tasks, boardId }: Props) {
  const [newList, setNewList] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const router = useRouter()

  function startCreatingNewList(value: boolean) {
    if (value) {
      setNewList(true)
      setInputValue("")
    } else {
      setNewList(false)
      setInputValue("")
    }
  }

  async function createNewList() {
    await addNewList(boardId, inputValue)

    setNewList(false)
    setInputValue("")

    router.refresh()
  }

  return (
    <div className="p-2 flex gap-2">
      {lists.map((list: any, index: number) => (
        <Tasks key={index} list={list} listId={list._id} tasks={tasks} boardId={boardId} />
      ))}

      {newList ? (
        <div className="flex flex-col gap-2 p-2 bg-gray-200 rounded-2xl text-gray-700 font-[600] min-w-[250px] h-max shadow-lg">
          <input
            type="text"
            placeholder="Enter list name..."
            className="w-full p-2 text-gray-700 bg-white rounded-2xl"
            onChange={(e: any) => setInputValue(e.target.value)}
          />

          <div className="flex justify-between">
            <div
              className="p-2 bg-blue-600 text-white hover:cursor-pointer transition-colors hover:bg-blue-700 rounded-2xl"
              onClick={createNewList}
            >
              Add list
            </div>

            <div
              className="p-2 text-gray-700 hover:cursor-pointer transition-colors hover:text-gray-800 rounded-2xl"
              onClick={() => startCreatingNewList(false)}
            >
              Close
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-2 bg-gray-200 rounded-2xl text-gray-700 font-[600] min-w-[250px] h-max shadow-lg opacity-70 hover:cursor-pointer transition-colors hover:bg-gray-300"
          onClick={() => startCreatingNewList(true)}
        >
          Add another list
        </div>
      )}
    </div>
  )
}