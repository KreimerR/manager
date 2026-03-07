"use client"

import Image from "next/image"
import { useState } from "react"
import editBoardTitle from "@/actions/editBoardTitle"
import { useRouter } from "next/navigation"

type Props = {
  userBoard: any
  session: any
}

export default function BoardInfo({ userBoard, session }: Props) {
  const [editingTitle, setEditingTitle] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")

  const router = useRouter()

  function startEditingTitle(value: boolean) {
    if (value) {
      setEditingTitle(true)
      setInputValue("")
    } else if (!value) {
      setEditingTitle(false)
      setInputValue("")
    }
  }

  async function editTitle(e: any) {
    e.preventDefault()

    await editBoardTitle(userBoard._id, inputValue)

    setEditingTitle(false)
    setInputValue("")

    router.refresh()
  }

  return (
    <div className="p-5 relative flex justify-between items-center">
      {editingTitle ? (
        <form
          onSubmit={(e: any) => editTitle(e)}
          className="flex justify-between items-center gap-2"
        >
          <input
            type="text"
            placeholder={userBoard.title} onChange={(e: any) => setInputValue(e.target.value)}
            className="text-lg font-bold bg-white rounded-2xl px-2 z-10 text-gray-700"
          />

          <input
            type="submit"
            value="Submit"
            className="text-lg font-bold bg-white rounded-2xl px-2 z-10 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-100"
          />

          <input
            type="button"
            value="Close"
            onClick={() => startEditingTitle(false)}
            className="text-lg font-bold bg-white rounded-2xl px-2 z-10 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-100"
          />
        </form>
      ) : (
        <h1
          className="text-lg font-bold text-gray-700 z-10"
          onClick={() => startEditingTitle(true)}
        >
          {userBoard.title}
        </h1>
      )}
      <Image
        src={session.user.image}
        alt="User Icon"
        width={500}
        height={500}
        className="object-cover w-[30px] h-[30px] rounded-full z-10"
      />
      <div className="bg-white opacity-30 absolute top-0 left-0 w-full h-full rounded-t-2xl"></div>
    </div>
  )
}