import { auth } from "@/lib/auth"
import LogIn from "@/components/LogIn"
import { redirect } from "next/navigation"

export default async function Authorization() {
  const session = await auth()

  if (session?.user) return redirect("/boards")

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full md:px-10">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome to Manager</h1>
        <p className="text-gray-700 text-sm text-center px-5 md:px-0">Manage all your projects and personal duties in one application</p>
        <LogIn />
      </div>
    </div>
  )
}