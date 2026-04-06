"use client"

import { useListsContext } from "./ListsContext"
import { ListProvider } from "./ListContext"
import type { ListType, TaskType } from "@/types"
import RenderedList from "./RenderedList"

export default function List({ list }: { list: ListType }) {
  const listsLogic = useListsContext()

  const listTasks = listsLogic.tasks.filter((task: TaskType) => task.listId === list._id)

  return (
    <ListProvider list={list} listTasks={listTasks}>
      <RenderedList list={list} />
    </ListProvider>
  )
}