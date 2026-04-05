"use client"

import { useListContext } from "./ListContext"

export default function ListTitleEditing() {
  const listLogic = useListContext()

  return (
    <form
      onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => listLogic.changeListTitle(e, listLogic.list._id)}
      className={`flex justify-between items-center gap-2 ${listLogic.listTasks.length !== 0 && "pb-2"}`}
    >
      <input
        type="text"
        placeholder={listLogic.list.title}
        className="px-2 font-[600] bg-white rounded-lg outline-2 outline-blue-500 w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => listLogic.setInputValue(e.target.value)}
      />

      <input
        type="submit"
        value="Submit"
        className="px-2 bg-white font-[600] rounded-lg transition-colors hover:cursor-pointer hover:bg-gray-100"
      />

      <input
        type="button"
        value="Close"
        className="px-2 bg-white font-[600] rounded-lg transition-colors hover:cursor-pointer hover:bg-gray-100"
        onClick={listLogic.stopEditingListTitle}
      />
    </form>
  )
}