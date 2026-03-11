"use client"

import { signIn } from "next-auth/react"

export default function LogIn() {
  return (
    <div className="flex flex-col items-center gap-5 w-[70vw] lg:w-[400px]">
      <button
        className="p-2 rounded-lg w-full text-gray-700 outline-1 outline-gray-700 transition-all hover:cursor-pointer hover:bg-gray-100"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  )
}