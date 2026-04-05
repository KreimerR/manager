"use client"

import { createContext, ReactNode, useContext } from "react"
import useTask from "@/hooks/useTask"
import type { TaskType } from "@/types"

const TaskContext = createContext<any | null>(null)

export function TaskProvider({ task, children }: { task: TaskType, children: ReactNode }) {
  const taskLogic = useTask()

  return (
    <TaskContext.Provider value={{ ...taskLogic, task }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)

  if (!context) throw new Error("useTaskContext must be used within a TaskProvider")

  return context
}