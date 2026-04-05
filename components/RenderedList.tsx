"use client"

import { ListType } from "@/types"
import CreateNewTask from "./CreateNewTask"
import { useListContext } from "./ListContext"
import ListInfo from "./ListInfo"
import { useListsContext } from "./ListsContext"
import ListTitle from "./ListTitle"
import ListTitleEditing from "./ListTitleEditing"
import Tasks from "./Tasks"

export default function RenderedList({ list }: { list: ListType }) {
  const listLogic = useListContext()
  const listsLogic = useListsContext()

  return (
    <div
      className={`
              p-2 bg-gray-200 rounded-2xl text-gray-700 min-w-[250px] max-w-[250px] shadow-lg h-full 
              ${listsLogic.taskMoving
        && "outline-2 outline-red-500 hover:bg-gray-100 hover:cursor-pointer"}
            `}
      onClick={
        listsLogic.taskMoving ?
          () => listLogic.changeTheListOfTheTask(listsLogic.chosenTask, list._id, listsLogic.setChosenTask, listsLogic.setTaskMoving)
          : undefined
      }
    >
      {listLogic.listEditing ? <ListTitleEditing /> : <ListTitle />}
      <Tasks />
      {listLogic.newTask ? <CreateNewTask /> : <ListInfo />}
    </div>
  )
}