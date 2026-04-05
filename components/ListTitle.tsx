"use client"

import { useListsContext } from "./ListsContext"
import { useListContext } from "./ListContext"

export default function ListTitle() {
  const listsLogic = useListsContext()
  const listLogic = useListContext()

  return (
    <h1
      className={`px-2 ${listLogic.listTasks.length !== 0 && "pb-2"} font-[600]`}
      onClick={listsLogic.taskMoving ? undefined : listLogic.startEditingListTitle}
    >
      {listLogic.list.title}
    </h1>
  )
}