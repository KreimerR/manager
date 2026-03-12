"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import addNewTask from "@/actions/addNewTask"
import editListTitle from "@/actions/editListTitle"
import deleteList from "@/actions/deleteList"
import Task from "./Task"
import type { ListType, TaskType } from "@/types"
import changeListOfTask from "@/actions/changeListOfTask"

type Props = {
  list: ListType
  listId: string
  tasks: TaskType[]
  boardId: string
  chosenTask: string
  setChosenTask: React.Dispatch<React.SetStateAction<string>>
  taskMoving: boolean
  setTaskMoving: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Tasks({ list, listId, tasks, boardId, chosenTask, setChosenTask, taskMoving, setTaskMoving }: Props) {
  const [newTask, setNewTask] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [listEditing, setListEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const router = useRouter()

  function startCreatingNewTask(type: boolean) {
    if (type) {
      setNewTask(true)
      setTitle("")
    } else if (!type) {
      setNewTask(false)
      setTitle("")
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
    await addNewTask(boardId, listId, title)

    setNewTask(false)
    setTitle("")

    router.refresh()
  }

  async function changeListTitle(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    await editListTitle(listId, inputValue)

    setListEditing(false)
    setInputValue("")

    router.refresh()
  }

  async function deleteTheList() {
    await deleteList(listId)

    router.refresh()
  }

  async function changeTheListOfTheTask() {
    await changeListOfTask(chosenTask, listId)

    setChosenTask("")
    setTaskMoving(false)

    router.refresh()
  }

  const listTasks = tasks.filter((task: TaskType) => task.listId === list._id)

  return (
    <div
      className={`p-2 bg-gray-200 rounded-2xl text-gray-700 min-w-[250px] max-w-[250px] shadow-lg h-full ${taskMoving && "outline-2 outline-red-500 hover:bg-gray-100 hover:cursor-pointer"}`}
      onClick={taskMoving ? changeTheListOfTheTask : undefined}
    >
      {listEditing ? (
        <form
          onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => changeListTitle(e)}
          className={`flex justify-between items-center gap-2 ${listTasks.length !== 0 && "pb-2"}`}
        >
          <input
            type="text"
            placeholder={list.title}
            className="px-2 font-[600] bg-white rounded-lg outline-2 outline-blue-500 w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          />

          <input
            type="submit"
            value="Submit"
            className="px-2 bg-white font-[600] rounded-lg transition-colors hover:cursor-pointer hover:bg-gray-100"
          />

          <input
            type="button"
            value="Close"
            className="px-2 bg-white font-[600] rounded-lg transition-colors hover:cursor-pointer hover:bg-gray-100"
            onClick={() => startEditingListTitle(false)}
          />
        </form>
      ) : (
        <h1
          className={`px-2 ${listTasks.length !== 0 && "pb-2"} font-[600]`}
          onClick={taskMoving ? undefined : () => startEditingListTitle(true)}
        >
          {list.title}
        </h1>
      )}

      <div className="flex flex-col gap-2 p-1 max-h-[60vh] overflow-y-scroll">
        {listTasks.map((task: TaskType, index2: number) => {
          if (task.listId.toString() === list._id.toString()) {
            return (
              <Task
                key={index2}
                task={task}
                setChosenTask={setChosenTask}
                taskMoving={taskMoving}
                setTaskMoving={setTaskMoving}
              />
            )
          }
        })}
        {newTask && (
          <input
            type="text"
            placeholder="Enter a title"
            className="p-2 bg-white text-gray-700 rounded-2xl shadow-lg resize-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        )}
      </div>

      {newTask ? (
        <div className="w-full flex justify-between items-center pt-2">
          <div
            className="p-2 bg-blue-500 text-white hover:cursor-pointer transition-colors hover:bg-blue-600 rounded-2xl"
            onClick={taskMoving ? undefined : createNewTask}
          >
            Add Task
          </div>

          <div
            className="text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300 p-2 rounded-2xl"
            onClick={taskMoving ? undefined : () => startCreatingNewTask(false)}
          >
            Close
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-3 pt-2">
          <div
            className="p-2 text-gray-700 bg-gray-200 hover:cursor-pointer transition-colors hover:bg-gray-300 rounded-2xl"
            onClick={taskMoving ? undefined : () => startCreatingNewTask(true)}
          >
            Add Task
          </div>

          <div
            className="p-2 text-gray-700 bg-gray-200 hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white rounded-2xl"
            onClick={taskMoving ? undefined : deleteTheList}
          >
            Delete List
          </div>
        </div>
      )}
    </div>
  )
}