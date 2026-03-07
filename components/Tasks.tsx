"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import addNewTask from "@/actions/addNewTask"
import editListTitle from "@/actions/editListTitle"

type Props = {
  list: any
  index: any
  listId: any
  tasks: any
  boardId: any
}

export default function Tasks({ list, index, listId, tasks, boardId }: Props) {
  const [newTask, setNewTask] = useState<boolean>(false)
  const [textareaValue, setTextareaValue] = useState<string>("")
  const [listEditing, setListEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const router = useRouter()

  function startCreatingNewTask(type: boolean) {
    if (type) {
      setNewTask(true)
      setTextareaValue("")
    } else if (!type) {
      setNewTask(false)
      setTextareaValue("")
    }
  }

  function startEditingListTitle(type: boolean) {
    if (type) {
      setListEditing(true)
      setInputValue("")
    } else if (!type) {
      setListEditing(false)
      setInputValue("")
    }
  }

  async function createNewTask() {
    await addNewTask(boardId, listId, textareaValue)

    setNewTask(false)
    setTextareaValue("")

    router.refresh()
  }

  async function changeListTitle(e: any) {
    e.preventDefault()

    await editListTitle(listId, inputValue)

    setListEditing(false)
    setInputValue("")

    router.refresh()
  }

  const listTasks = tasks.filter((task: any) => task.listId === list._id)

  return (
    <div key={index} className="p-2 bg-gray-200 rounded-2xl text-gray-700 min-w-[250px] shadow-lg h-full">
      {listEditing ? (
        <form
          onSubmit={(e: any) => changeListTitle(e)}
          className="flex justify-between items-center gap-2"
        >
          <input
            type="text"
            placeholder={list.title}
            className="px-2 font-[600] bg-white rounded-2xl outline-2 outline-blue-500 w-full"
            onChange={(e: any) => setInputValue(e.target.value)}
          />

          <input
            type="submit"
            value="Submit"
            className="px-2 bg-white font-[600] rounded-2xl transition-colors hover:cursor-pointer hover:bg-gray-100"
          />

          <input
            type="button"
            value="Close"
            className="px-2 bg-white font-[600] rounded-2xl transition-colors hover:cursor-pointer hover:bg-gray-100"
            onClick={() => startEditingListTitle(false)}
          />
        </form>
      ) : (
        <h1 className="px-2 font-[600]" onClick={() => startEditingListTitle(true)}>{list.title}</h1>
      )}

      <div className="flex flex-col gap-2 py-2">
        {listTasks.map((task: any, index2: number) => {
          if (task.listId.toString() === list._id.toString()) {
            return (
              <div key={index2} className="p-2 bg-white shadow-sm text-gray-700 rounded-2xl hover:cursor-pointer overflow-x-scroll hover:outline-2 hover:outline-blue-500">
                {task.title}
              </div>
            )
          }
        })}
        {newTask && (
          <textarea
            name="textarea"
            id="textarea"
            placeholder="Enter a title"
            className="p-2 bg-white text-gray-700 rounded-2xl shadow-lg resize-none"
            onChange={(e: any) => setTextareaValue(e.target.value)}
          />
        )}
      </div>

      {newTask ? (
        <div className="w-full flex justify-between items-center">
          <div
            className="p-2 bg-blue-500 text-white hover:cursor-pointer transition-colors hover:bg-blue-600 rounded-2xl"
            onClick={createNewTask}
          >
            Add New Task
          </div>

          <div
            className="text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300 p-2 rounded-2xl"
            onClick={() => startCreatingNewTask(false)}
          >
            Close
          </div>
        </div>
      ) : (
        <div
          className="p-2 text-gray-700 bg-gray-200 hover:cursor-pointer transition-colors hover:bg-gray-300 rounded-2xl"
          onClick={() => startCreatingNewTask(true)}
        >
          Add a New Task
        </div>
      )}
    </div>
  )
}