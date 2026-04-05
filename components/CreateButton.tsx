"use client"

import useCreateButton from "@/hooks/useCreateButton"
import ChooseBackground from "./ChooseBackground"

export default function CreateButton() {
  const createButtonLogic = useCreateButton()

  return (
    <div>
      {createButtonLogic.boardCreating ? (
        <div className="relative">
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded-md font-[600] hover:cursor-pointer text-center"
            onClick={createButtonLogic.stopCreatingTheBoard}
          >
            Close
          </button>

          <div className="absolute bottom-[-900%] right-0 bg-white rounded-2xl w-[300px] flex flex-col justify-center gap-5 p-2 z-20 shadow-lg outline-1 outline-gray-200">
            <span className="text-gray-700 text-center">Create board</span>

            <ChooseBackground
              chosenBackground={createButtonLogic.chosenBackground}
              setChosenBackground={createButtonLogic.setChosenBackground}
            />

            <form
              className="flex flex-col gap-1 w-full"
              onSubmit={createButtonLogic.createTheBoard}
            >
              <label className="text-gray-700 text-left">Board title</label>

              <input
                type="text"
                className="p-2 rounded-lg w-full outline-1 outline-gray-700"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => createButtonLogic.setBoardTitle(e.target.value)}
              />

              <input
                type="submit"
                value="Create"
                className="p-2 mt-2 rounded-lg w-full bg-gray-200 text-gray-700 hover:cursor-pointer transition-colors hover:bg-gray-300 text-center"
              />
            </form>
          </div>
        </div>

      ) : (
        <button
          className="bg-blue-700 text-white px-3 py-1 rounded-md font-[600] hover:cursor-pointer relative text-center"
          onClick={createButtonLogic.startCreatingTheBoard}
        >
          Create
        </button>
      )}
    </div>
  )
}