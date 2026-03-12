export type BoardType = {
  _id: string
  userId: string
  title: string
  image: string
}

export type ListType = {
  _id: string
  boardId: string
  userId: string
  title: string
}

export type TaskType = {
  _id: string
  listId: string
  boardId: string
  userId: string
  title: string
  completed: boolean
}
