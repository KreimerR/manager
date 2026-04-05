import { ObjectId } from "mongodb"
import { StaticImageData } from "next/image"

export type BoardDocumentType = {
  _id: ObjectId
  userId: ObjectId
  title: string
  image: string
}

export type ListDocumentType = {
  _id: ObjectId
  boardId: ObjectId
  userId: ObjectId
  title: string
}

export type TaskDocumentType = {
  _id: ObjectId
  listId: ObjectId
  boardId: ObjectId
  userId: ObjectId
  title: string
  completed: boolean
}

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

export type BackgroundType = {
  url: string
  background: StaticImageData
}
