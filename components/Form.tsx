"use client"

import { useState } from "react"

export default function Form() {
  const [value, setValue] = useState<string>("")

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-between items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        className="w-[50vw] outline-1 outline-gray-200 rounded-md px-3 py-1"
      />
      <input
        type="submit"
        value="Create"
        className="bg-blue-700 text-white px-3 py-1 rounded-md font-[600] hover:cursor-pointer"
      />
    </form>
  )
}