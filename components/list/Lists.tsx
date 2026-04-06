import { ListsProvider } from "./ListsContext"
import type { ListType, TaskType } from "@/types"
import List from "./List"
import NewList from "./NewList"

type Props = {
  lists: ListType[]
  tasks: TaskType[]
  boardId: string
}

export default function Lists({ lists, tasks, boardId }: Props) {
  return (
    <ListsProvider lists={lists} tasks={tasks} boardId={boardId}>
      <div className="p-2 flex gap-2">
        {lists.map((list: ListType) => (
          <List key={list._id} list={list} />
        ))}

        <NewList />
      </div>
    </ListsProvider>
  )
}