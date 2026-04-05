"use client"

import { useTaskContext } from "./TaskContext"

export default function TaskTitleEditing() {
  const taskLogic = useTaskContext()

  return (
    <form
      className="flex justify-between items-center w-full"
      onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => taskLogic.editTheTaskTitle(e, taskLogic.task)}
    >
      <input
        type="text"
        placeholder={taskLogic.task.title}
        className="max-w-[80px] overflow-x-scroll rounded-lg"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => taskLogic.setNewTaskTitle(e.target.value)}
      />

      <div className="flex items-center gap-1">
        <input
          type="submit"
          value="Submit"
          className="py-1 px-2 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
        />

        <input
          type="button"
          value="Close"
          className="py-1 px-2 bg-gray-100 rounded-lg hover:cursor-pointer transition-colors hover:bg-gray-200"
          onClick={taskLogic.stopEditingTaskTitle}
        />
      </div>
    </form>
  )
}