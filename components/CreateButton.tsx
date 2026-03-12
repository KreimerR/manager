"use client"

import { useState } from "react"
import Image from "next/image"
import background1 from "@/public/background-1.jpg"
import background2 from "@/public/background-2.jpg"
import background3 from "@/public/background-3.jpg"
import background4 from "@/public/background-4.jpg"
import createBoard from "@/actions/createBoard"
import { redirect } from "next/navigation"

export default function CreateButton() {
  const [boardCreating, setBoardCreating] = useState<boolean>(false)
  const [boardTitle, setBoardTitle] = useState<string>("")
  const [chosenBackground, setChosenBackground] = useState<string>("")

  async function createTheBoard() {
    if (chosenBackground === "") return

    if (boardTitle === "") return

    const boardId = await createBoard(chosenBackground, boardTitle)

    setBoardTitle("")
    setChosenBackground("")
    setBoardCreating(false)

    redirect(`/b/${boardId}`)
  }

  function startCreatingTheBoard(value: boolean) {
    if (value) {
      setBoardCreating(true)
      setBoardTitle("")
      setChosenBackground("")
    } else if (!value) {
      setBoardCreating(false)
      setBoardTitle("")
      setChosenBackground("")
    }
  }

  return (
    <div>
      {boardCreating ? (
        <div className="relative">
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded-md font-[600] hover:cursor-pointer text-center"
            onClick={() => startCreatingTheBoard(false)}
          >
            Close
          </button>

          <div className="absolute bottom-[-900%] right-0 bg-white rounded-2xl w-[300px] flex flex-col justify-center gap-5 p-2 z-20 shadow-2xl">
            <span className="text-gray-700 text-center">Create board</span>

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

            <div className="flex flex-col gap-1 w-full">
              <span className="text-gray-700 text-left">Board title</span>

              <input
                type="text"
                className="p-2 rounded-lg w-full outline-1 outline-gray-700"
                onChange={(e: any) => setBoardTitle(e.target.value)}
              />
            </div>

            <button
              className="p-2 rounded-lg w-full bg-gray-200 text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300 text-center"
              onClick={createTheBoard}
            >
              Create
            </button>
          </div>
        </div>

      ) : (
        <button
          className="bg-blue-700 text-white px-3 py-1 rounded-md font-[600] hover:cursor-pointer relative text-center"
          onClick={() => startCreatingTheBoard(true)}
        >
          Create
        </button>
      )}
    </div>
  )
}