"use client"

import { useState } from "react"
import editTaskTitle from "@/actions/editTaskTitle"
import { useRouter } from "next/navigation"

type Props = {
  task: any
}

export default function Task({ task }: Props) {
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

  async function editTheTaskTitle(e: any) {
    e.preventDefault()

    await editTaskTitle(task._id, newTaskTitle)

    setTaskTitleEditing(false)
    setNewTaskTitle("")

    router.refresh()
  }

  return (
    <div className="flex justify-between items-center p-2 bg-white shadow-sm text-gray-700 rounded-2xl hover:cursor-pointer hover:outline-2 hover:outline-blue-500 relative">
      {taskTitleEditing ? (
        <form
          className="flex justify-between items-center w-full"
          onSubmit={(e: any) => editTheTaskTitle(e)}
        >
          <input
            type="text"
            placeholder={task.title}
            className="max-w-[80px] overflow-x-scroll rounded-lg"
            onChange={(e: any) => setNewTaskTitle(e.target.value)}
          />

          <div className="flex items-center gap-1">
            <input
              type="submit"
              value="Submit"
              className="py-1 px-2 bg-gray-100 rounded-2xl hover:cursor-pointer transition-colors hover:bg-gray-200"
            />

            <input
              type="button"
              value="Close"
              className="py-1 px-2 bg-gray-100 rounded-2xl hover:cursor-pointer transition-colors hover:bg-gray-200"
              onClick={() => startEditingTaskTitle(false)}
            />
          </div>
        </form>
      ) : (
        <>
          <p
            className="max-w-[150px] overflow-x-scroll"
            onClick={() => startEditingTaskTitle(true)}
          >
            {task.title}
          </p>

          <div
            className="py-1 px-3 bg-gray-100 rounded-2xl hover:cursor-pointer transition-colors hover:bg-gray-200"
            onClick={() => setTaskEditing((prev) => !prev)}
          >
            Edit
          </div>
        </>
      )}
    </div>
  )
}