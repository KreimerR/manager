"use client"

import useBoardInfo from "@/hooks/useBoardInfo"
import { BoardType } from "@/types"
import ChooseBackground from "./ChooseBackground"

export default function BoardInfo({ userBoard }: { userBoard: BoardType }) {
  const boardInfoLogic = useBoardInfo()

  return (
    <div className="p-5 relative flex justify-between items-center gap-2">
      {boardInfoLogic.editingTitle ? (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => boardInfoLogic.editTitle(e, userBoard._id)}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={userBoard.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => boardInfoLogic.setInputValue(e.target.value)}
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
            onClick={boardInfoLogic.stopEditingTitle}
            className="text-md font-bold bg-white rounded-lg px-2 z-10 text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-100"
          />
        </form>
      ) : (
        <button
          className="text-md font-bold text-gray-700 bg-white rounded-lg px-2 z-10"
          onClick={boardInfoLogic.startEditingTitle}
        >
          {userBoard.title}
        </button>
      )}

      <button
        className="px-2 bg-white font-[600] rounded-lg transition-colors hover:cursor-pointer hover:bg-gray-100 z-10"
        onClick={boardInfoLogic.changingBackground ? boardInfoLogic.stopChangingBackground : boardInfoLogic.startChangingBackground}
      >
        Background
      </button>

      {boardInfoLogic.changingBackground && (
        <div className="absolute bottom-[-240%] right-2 bg-white rounded-2xl w-[300px] flex flex-col justify-center gap-5 p-2 z-20 shadow-2xl">
          <ChooseBackground
            chosenBackground={boardInfoLogic.chosenBackground}
            setChosenBackground={boardInfoLogic.setChosenBackground}
          />

          <button
            className="p-2 rounded-lg w-full bg-gray-200 text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300"
            onClick={() => boardInfoLogic.changeBackground(userBoard._id)}
          >
            Done
          </button>
        </div>
      )}

      <div className="bg-white opacity-30 absolute top-0 left-0 w-full h-full rounded-t-2xl" />
    </div>
  )
}