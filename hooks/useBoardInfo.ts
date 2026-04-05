"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import editBoardTitle from "@/actions/editBoardTitle"
import changeBoardBackground from "@/actions/changeBoardBackground"

export default function useBoardInfo() {
  const [editingTitle, setEditingTitle] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [changingBackground, setChangingBackground] = useState<boolean>(false)
  const [chosenBackground, setChosenBackground] = useState<string>("")

  const router = useRouter()

  const startEditingTitle = useCallback(() => {
    setEditingTitle(true)
    setInputValue("")
  }, [])

  const stopEditingTitle = useCallback(() => {
    setEditingTitle(false)
    setInputValue("")
  }, [])

  const startChangingBackground = useCallback(() => {
    setChangingBackground(true)
    setChosenBackground("")
  }, [])

  const stopChangingBackground = useCallback(() => {
    setChangingBackground(false)
    setChosenBackground("")
  }, [])

  const editTitle = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, userBoardId: string) => {
      e.preventDefault()

      await editBoardTitle(userBoardId, inputValue)

      setEditingTitle(false)
      setInputValue("")

      router.refresh()
    },
    [inputValue],
  )

  const changeBackground = useCallback(
    async (userBoardId: string) => {
      await changeBoardBackground(userBoardId, chosenBackground)

      setChangingBackground(false)
      setChosenBackground("")

      router.refresh()
    },
    [chosenBackground],
  )

  return {
    editingTitle,
    setInputValue,
    changingBackground,
    chosenBackground,
    setChosenBackground,
    startEditingTitle,
    stopEditingTitle,
    startChangingBackground,
    stopChangingBackground,
    editTitle,
    changeBackground,
  }
}
