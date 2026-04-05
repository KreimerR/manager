"use client"

import { useState, useCallback } from "react"
import { redirect } from "next/navigation"
import createBoard from "@/actions/createBoard"

export default function useCreateButton() {
  const [boardCreating, setBoardCreating] = useState<boolean>(false)
  const [boardTitle, setBoardTitle] = useState<string>("")
  const [chosenBackground, setChosenBackground] = useState<string>("")

  const createTheBoard = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (chosenBackground === "") return

      if (boardTitle === "") return

      const boardId = await createBoard(chosenBackground, boardTitle)

      setBoardTitle("")
      setChosenBackground("")
      setBoardCreating(false)

      redirect(`/b/${boardId}`)
    },
    [chosenBackground, boardTitle],
  )

  const startCreatingTheBoard = useCallback(() => {
    setBoardCreating(true)
    setBoardTitle("")
    setChosenBackground("")
  }, [])

  const stopCreatingTheBoard = useCallback(() => {
    setBoardCreating(false)
    setBoardTitle("")
    setChosenBackground("")
  }, [])

  return {
    boardCreating,
    setBoardTitle,
    chosenBackground,
    setChosenBackground,
    createTheBoard,
    startCreatingTheBoard,
    stopCreatingTheBoard,
  }
}
