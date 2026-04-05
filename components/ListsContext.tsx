"use client"

import { createContext, useContext, ReactNode } from "react"
import { ListType, TaskType } from "@/types"
import useLists from "@/hooks/useLists"

type ListsContextType = ReturnType<typeof useLists> & {
  lists: ListType[]
  tasks: TaskType[]
  boardId: string
}

const ListsContext = createContext<ListsContextType | null>(null)

export function ListsProvider({ lists, tasks, boardId, children }: { lists: ListType[], tasks: TaskType[], boardId: string, children: ReactNode }) {
  const listsLogic = useLists()

  return (
    <ListsContext.Provider value={{ ...listsLogic, lists, tasks, boardId }}>
      {children}
    </ListsContext.Provider>
  )
}

export function useListsContext() {
  const context = useContext(ListsContext)

  if (!context) throw new Error("useListsContext must be used within ListsProvider")

  return context
}