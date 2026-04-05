"use client"

import { createContext, useContext, ReactNode } from "react"
import useList from "@/hooks/useList";
import { ListType, TaskType } from "@/types";

const ListContext = createContext<any | null>(null)

export function ListProvider({ list, listTasks, children }: { list: ListType, listTasks: TaskType[], children: ReactNode }) {
  const listLogic = useList()

  return (
    <ListContext.Provider value={{ ...listLogic, list, listTasks }}>
      {children}
    </ListContext.Provider>
  );
}

export function useListContext() {
  const context = useContext(ListContext)

  if (!context) throw new Error("useListContext must be used within ListProvider")

  return context
};