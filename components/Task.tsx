"use client"

import { useState } from "react"
import editTaskTitle from "@/actions/editTaskTitle"
import { useRouter } from "next/navigation"
import deleteTask from "@/actions/deleteTask"
import markTaskAsCompleted from "@/actions/markTaskAsCompleted"
import markTaskAsNotCompleted from "@/actions/markTaskAsNotCompleted"
import type { TaskType } from "@/types"

type Props = {
  task: TaskType
  setChosenTask: React.Dispatch<React.SetStateAction<string>>
  taskMoving: boolean
  setTaskMoving: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Task({ task, setChosenTask, taskMoving, setTaskMoving }: Props) {
  const [taskEditing, setTaskEditing] = useState<boolean>(false)
  const [taskTitleEditing, setTaskTitleEditing] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState<string>("")

  const router = useRouter()

  function startEditingTaskTitle(value: boolean) {
    if (value) {
      setTaskTitleEditing(true)
      setNewTaskTitle("")
    } else if (!value) {
      setTaskTitleEditing(false)
      setNewTaskTitle("")
    }
  }

  async function editTheTaskTitle(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    await editTaskTitle(task._id, newTaskTitle)

    setTaskTitleEditing(false)
    setNewTaskTitle("")

    router.refresh()
  }

  async function deleteTheTask() {
    await deleteTask(task._id)

    setTaskEditing(false)

    router.refresh()
  }

  async function markTheTaskAsCompleted() {
    await markTaskAsCompleted(task._id)

    setTaskEditing(false)

    router.refresh()
  }

  async function markTheTaskAsNotCompleted() {
    await markTaskAsNotCompleted(task._id)

    setTaskEditing(false)

    router.refresh()
  }

  function closeEditing() {
    setTaskMoving(false)
    setChosenTask("")
    setTaskEditing(false)
  }

  function setTheChosenTask() {
    setTaskMoving(true)
    setChosenTask(task._id)
  }

  function stopSettingTheChosenTask() {
    setTaskMoving(false)
    setChosenTask("")
  }

  return (
    <div className={`flex justify-between items-center p-2 ${task.completed ? "bg-gray-100" : "bg-white"} shadow-sm text-gray-700 rounded-2xl hover:cursor-pointer hover:outline-2 hover:outline-blue-500 relative`}>
      {taskEditing ? (
        <div className="flex justify-between items-center gap-1 w-full">
          {task.completed ? (
            <button
              className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-blue-500 hover:text-white"
              onClick={markTheTaskAsNotCompleted}
            >
              Undone
            </button>
          ) : (
            <button
              className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-blue-500 hover:text-white"
              onClick={markTheTaskAsCompleted}
            >
              Done
            </button>
          )}

          {taskMoving ? (
            <>
              <button
                className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                onClick={deleteTheTask}
              >
                Delete
              </button>

              <button
                className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                onClick={stopSettingTheChosenTask}
              >
                Stop
              </button>

              <button
                className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                onClick={closeEditing}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <button
                className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                onClick={deleteTheTask}
              >
                Delete
              </button>

              <button
                className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                onClick={setTheChosenTask}
              >
                Move
              </button>

              <button
                className="py-1 px-1 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                onClick={() => setTaskEditing(false)}
              >
                Close
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {taskTitleEditing ? (
            <form
              className="flex justify-between items-center w-full"
              onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => editTheTaskTitle(e)}
            >
              <input
                type="text"
                placeholder={task.title}
                className="max-w-[80px] overflow-x-scroll rounded-lg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)}
              />

              <div className="flex items-center gap-1">
                <input
                  type="submit"
                  value="Submit"
                  className="py-1 px-2 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                />

                <input
                  type="button"
                  value="Close"
                  className="py-1 px-2 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                  onClick={() => startEditingTaskTitle(false)}
                />
              </div>
            </form>
          ) : (
            <>
              <p
                className={`max-w-[150px] overflow-x-scroll ${task.completed && "line-through"}`}
                onClick={() => startEditingTaskTitle(true)}
              >
                {task.title}
              </p>

              <div
                className="py-1 px-3 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
                onClick={() => setTaskEditing(true)}
              >
                Edit
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}