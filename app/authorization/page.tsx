import { auth } from "@/lib/auth"
import LogIn from "@/components/LogIn"
import { redirect } from "next/navigation"
import Image from "next/image"
import logo from "@/app/favicon.ico"
import banner from "@/public/authorization-banner.png"

export default async function Authorization() {
  const session = await auth()

  if (session?.user) return redirect("/boards")

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-full md:px-10 max-w-[250px] md:max-w-none">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={200}
          className="w-[100px] h-[100px]"
        />

        <h1 className="text-2xl md:text-3xl text-gray-700 font-bold">Welcome to Manager</h1>
        <p className="text-gray-700 text-sm text-center px-5 md:px-0">Manage all your projects and personal duties in one application</p>
        <LogIn />
      </div>

      <Image
        src={banner}
        alt="Banner"
        width={2000}
        height={2000}
        className="w-[1000px] h-full hidden xl:block"
      />
    </div>
  )
}