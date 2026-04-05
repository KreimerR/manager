"use client"

import { useState, useCallback } from "react"
import editTaskTitle from "@/actions/editTaskTitle"
import { useRouter } from "next/navigation"
import deleteTask from "@/actions/deleteTask"
import markTaskAsCompleted from "@/actions/markTaskAsCompleted"
import markTaskAsNotCompleted from "@/actions/markTaskAsNotCompleted"
import type { TaskType } from "@/types"

export default function useTask() {
  const [taskEditing, setTaskEditing] = useState<boolean>(false)
  const [taskTitleEditing, setTaskTitleEditing] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState<string>("")

  const router = useRouter()

  const startEditingTaskTitle = useCallback(() => {
    setTaskTitleEditing(true)
    setNewTaskTitle("")
  }, [])

  const stopEditingTaskTitle = useCallback(() => {
    setTaskTitleEditing(false)
    setNewTaskTitle("")
  }, [])

  const editTheTaskTitle = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>, task: TaskType) => {
      e.preventDefault()

      await editTaskTitle(task._id, newTaskTitle)

      setTaskTitleEditing(false)
      setNewTaskTitle("")

      router.refresh()
    },
    [newTaskTitle],
  )

  const deleteTheTask = useCallback(async (task: TaskType) => {
    await deleteTask(task._id)

    setTaskEditing(false)

    router.refresh()
  }, [])

  const markTheTaskAsCompleted = useCallback(async (task: TaskType) => {
    await markTaskAsCompleted(task._id)

    setTaskEditing(false)

    router.refresh()
  }, [])

  const markTheTaskAsNotCompleted = useCallback(async (task: TaskType) => {
    await markTaskAsNotCompleted(task._id)

    setTaskEditing(false)

    router.refresh()
  }, [])

  const stopEditing = useCallback(
    (
      setTaskMoving: React.Dispatch<React.SetStateAction<boolean>>,
      setChosenTask: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      setTaskMoving(false)
      setChosenTask("")
      setTaskEditing(false)
    },
    [],
  )

  const setTheChosenTask = useCallback(
    (
      task: TaskType,
      setTaskMoving: React.Dispatch<React.SetStateAction<boolean>>,
      setChosenTask: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      setTaskMoving(true)
      setChosenTask(task._id)
    },
    [],
  )

  const stopSettingTheChosenTask = useCallback(
    (
      setTaskMoving: React.Dispatch<React.SetStateAction<boolean>>,
      setChosenTask: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      setTaskMoving(false)
      setChosenTask("")
    },
    [],
  )

  return {
    taskEditing,
    setTaskEditing,
    taskTitleEditing,
    setNewTaskTitle,
    startEditingTaskTitle,
    stopEditingTaskTitle,
    editTheTaskTitle,
    deleteTheTask,
    markTheTaskAsCompleted,
    markTheTaskAsNotCompleted,
    stopEditing,
    setTheChosenTask,
    stopSettingTheChosenTask,
  }
}
