"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import addNewTask from "@/actions/addNewTask"
import editListTitle from "@/actions/editListTitle"
import changeListOfTask from "@/actions/changeListOfTask"
import deleteList from "@/actions/deleteList"

export default function useList() {
  const [newTask, setNewTask] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [listEditing, setListEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const router = useRouter()

  const startCreatingNewTask = useCallback(() => {
    setNewTask(true)
    setTitle("")
  }, [])

  const stopCreatingNewTask = useCallback(() => {
    setNewTask(false)
    setTitle("")
  }, [])

  const startEditingListTitle = useCallback(() => {
    setListEditing(true)
    setInputValue("")
  }, [])

  const stopEditingListTitle = useCallback(() => {
    setListEditing(false)
    setInputValue("")
  }, [])

  const createNewTask = useCallback(
    async (boardId: string, listId: string) => {
      await addNewTask(boardId, listId, title)

      setNewTask(false)
      setTitle("")

      router.refresh()
    },
    [title],
  )

  const changeListTitle = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>, listId: string) => {
      e.preventDefault()

      await editListTitle(listId, inputValue)

      setListEditing(false)
      setInputValue("")

      router.refresh()
    },
    [inputValue],
  )

  const deleteTheList = useCallback(async (listId: string) => {
    await deleteList(listId)

    router.refresh()
  }, [])

  const changeTheListOfTheTask = useCallback(
    async (
      chosenTask: string,
      listId: string,
      setChosenTask: React.Dispatch<React.SetStateAction<string>>,
      setTaskMoving: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      await changeListOfTask(chosenTask, listId)

      setChosenTask("")
      setTaskMoving(false)

      router.refresh()
    },
    [],
  )

  return {
    newTask,
    setNewTask,
    title,
    setTitle,
    listEditing,
    setListEditing,
    inputValue,
    setInputValue,
    startCreatingNewTask,
    stopCreatingNewTask,
    startEditingListTitle,
    stopEditingListTitle,
    createNewTask,
    changeListTitle,
    deleteTheList,
    changeTheListOfTheTask,
  }
}
