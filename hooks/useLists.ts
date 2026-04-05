"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import addNewList from "@/actions/addNewList"

export default function useLists() {
  const [newList, setNewList] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [chosenTask, setChosenTask] = useState<string>("")
  const [taskMoving, setTaskMoving] = useState<boolean>(false)

  const router = useRouter()

  const startCreatingNewList = useCallback(() => {
    setNewList(true)
    setInputValue("")
  }, [])

  const stopCreatingNewList = useCallback(() => {
    setNewList(false)
    setInputValue("")
  }, [])

  const createNewList = useCallback(
    async (boardId: string) => {
      await addNewList(boardId, inputValue)

      setNewList(false)
      setInputValue("")

      router.refresh()
    },
    [inputValue],
  )

  return {
    newList,
    setNewList,
    inputValue,
    setInputValue,
    chosenTask,
    setChosenTask,
    taskMoving,
    setTaskMoving,
    startCreatingNewList,
    stopCreatingNewList,
    createNewList,
  }
}
