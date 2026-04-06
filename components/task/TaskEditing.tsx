import TaskEditingCompletion from "./TaskEditingCompletion"
import TaskEditingMoving from "./TaskEditingMoving"

export default function TaskEditing() {
  return (
    <div className="flex justify-between items-center gap-1 w-full">
      <TaskEditingCompletion />
      <TaskEditingMoving />
    </div>
  )
}