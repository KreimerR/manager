import { TaskProvider } from "./TaskContext"
import type { TaskType } from "@/types"
import RenderedTask from "./RenderedTask"

export default function Task({ task }: { task: TaskType }) {
  return (
    <TaskProvider task={task}>
      <RenderedTask />
    </TaskProvider>
  )
}