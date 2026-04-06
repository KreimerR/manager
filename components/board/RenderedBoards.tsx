"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import deleteBoard from "@/actions/deleteBoard"
import type { BoardType } from "@/types"

export default function RenderedBoards({ boards }: { boards: BoardType[] }) {
  const router = useRouter()

  async function deleteTheBoard(boardId: string) {
    await deleteBoard(boardId)

    router.refresh()
  }

  const renderedBoards = boards.map((board: BoardType) => (
    <div key={board._id} className="flex flex-col shadow-lg rounded-b-2xl max-h-[150px] relative">
      <Link href={`/b/${board._id}`}>
        <Image
          src={board.image}
          alt="Board background"
          width={500}
          height={500}
          className="object-cover rounded-t-2xl w-[300px] h-[100px] opacity-100 hover:opacity-0"
        />

        <div className="absolute top-0 left-0 w-full h-[100px] bg-black opacity-0 hover:opacity-30 rounded-t-2xl" />
      </Link>
      <div className="bg-white p-3 rounded-b-2xl flex justify-between items-center">
        <Link href={`/b/${board._id}`}>{board.title}</Link>

        <button
          className="p-2 bg-white rounded-2xl hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
          onClick={() => deleteTheBoard(board._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))

  return (
    <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-x-3 gap-y-7">
      {renderedBoards.length === 0 ? (
        <h1 className="font-bold text-lg text-gray-700 w-[300px]">You do not have any boards yet.</h1>
      ) : (
        renderedBoards
      )}
    </div>
  )
}