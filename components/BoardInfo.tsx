"use client"

import { useState } from "react"
import editBoardTitle from "@/actions/editBoardTitle"
import { useRouter } from "next/navigation"
import Image from "next/image"
import background1 from "@/public/background-1.jpg"
import background2 from "@/public/background-2.jpg"
import background3 from "@/public/background-3.jpg"
import background4 from "@/public/background-4.jpg"
import changeBoardBackground from "@/actions/changeBoardBackground"

type Props = {
  userBoard: any
}

export default function BoardInfo({ userBoard }: Props) {
  const [editingTitle, setEditingTitle] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [changingBackground, setChangingBackground] = useState<boolean>(false)
  const [chosenBackground, setChosenBackground] = useState<string>("")

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

  function startChangingBackground(value: boolean) {
    if (value) {
      setChangingBackground(true)
      setChosenBackground("")
    } else if (!value) {
      setChangingBackground(false)
      setChosenBackground("")
    }
  }

  async function editTitle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await editBoardTitle(userBoard._id, inputValue)

    setEditingTitle(false)
    setInputValue("")

    router.refresh()
  }

  async function changeBackground() {
    await changeBoardBackground(userBoard._id, chosenBackground)

    setChangingBackground(false)
    setChosenBackground("")

    router.refresh()
  }

  return (
    <div className="p-5 relative flex justify-between items-center gap-2">
      {editingTitle ? (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => editTitle(e)}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={userBoard.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            className="text-md font-bold bg-white rounded-lg px-2 z-10 text-gray-700 w-[40%]"
          />

          <input
            type="submit"
            value="Submit"
            className="text-md font-bold bg-white rounded-lg px-2 z-10 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-100"
          />

          <input
            type="button"
            value="Close"
            onClick={() => startEditingTitle(false)}
            className="text-md font-bold bg-white rounded-lg px-2 z-10 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-100"
          />
        </form>
      ) : (
        <div
          className="text-md font-bold text-gray-700 bg-white rounded-lg px-2 z-10"
          onClick={() => startEditingTitle(true)}
        >
          {userBoard.title}
        </div>
      )}

      <button
        className="px-2 bg-white font-[600] rounded-lg transition-colors hover:cursor-pointer hover:bg-gray-100 z-10"
        onClick={() => changingBackground ? startChangingBackground(false) : startChangingBackground(true)}
      >
        Background
      </button>

      {changingBackground && (
        <div className="absolute bottom-[-240%] right-2 bg-white rounded-2xl w-[300px] flex flex-col justify-center gap-5 p-2 z-20 shadow-2xl">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-gray-700 text-left">Background</span>

            <div className="flex justify-between items-center gap-2 w-full">
              <div
                className="hover:cursor-pointer relative"
                onClick={() => setChosenBackground("https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg")}
              >
                <Image
                  src={background1}
                  alt="Background 1"
                  width={200}
                  height={200}
                  className="object-fit object-center w-[100px] h-[50px] rounded-md"
                />

                <div className={`absolute top-0 left-0 w-full h-full bg-black rounded-md opacity-0 transition-opacity ${chosenBackground === "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg" ? "opacity-40" : "hover:opacity-20"}`}></div>
              </div>

              <div
                className="hover:cursor-pointer relative"
                onClick={() => setChosenBackground("https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg")}
              >
                <Image
                  src={background2}
                  alt="Background 2"
                  width={200}
                  height={200}
                  className="object-fit object-center w-[100px] h-[50px] rounded-md"
                />

                <div className={`absolute top-0 left-0 w-full h-full bg-black rounded-md opacity-0 transition-opacity ${chosenBackground === "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg" ? "opacity-40" : "hover:opacity-20"}`}></div>
              </div>

              <div
                className="hover:cursor-pointer relative"
                onClick={() => setChosenBackground("https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg")}
              >
                <Image
                  src={background3}
                  alt="Background 3"
                  width={200}
                  height={200}
                  className="object-fit object-center w-[100px] h-[50px] rounded-md"
                />

                <div className={`absolute top-0 left-0 w-full h-full bg-black rounded-md opacity-0 transition-opacity ${chosenBackground === "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg" ? "opacity-40" : "hover:opacity-20"}`}></div>
              </div>

              <div
                className="hover:cursor-pointer relative"
                onClick={() => setChosenBackground("https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg")}
              >
                <Image
                  src={background4}
                  alt="Background 4"
                  width={200}
                  height={200}
                  className="object-fit object-center w-[100px] h-[50px] rounded-md"
                />

                <div className={`absolute top-0 left-0 w-full h-full bg-black rounded-md opacity-0 transition-opacity ${chosenBackground === "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg" ? "opacity-40" : "hover:opacity-20"}`}></div>
              </div>
            </div>
          </div>

          <button
            className="p-2 rounded-lg w-full bg-gray-200 text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300"
            onClick={changeBackground}
          >
            Done
          </button>
        </div>
      )}

      <div className="bg-white opacity-30 absolute top-0 left-0 w-full h-full rounded-t-2xl"></div>
    </div>
  )
}