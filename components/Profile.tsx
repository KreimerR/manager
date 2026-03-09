"use client"

import Image from "next/image"
import { useState } from "react"
import { signOut } from "next-auth/react"
import deleteAccount from "@/actions/deleteAccount"
import { useRouter } from "next/navigation"

type Props = {
  session: any
}

export default function Profile({ session }: Props) {
  const [profileOpened, setProfileOpened] = useState<boolean>(false)

  const router = useRouter()

  async function deleteTheAccount() {
    await deleteAccount()

    setProfileOpened(false)

    router.refresh()
  }

  return (
    <div>
      <div
        className="relative"
        onClick={() => setProfileOpened((prev: boolean) => !prev)}
      >
        <Image
          src={session.user.image}
          width={30}
          height={30}
          alt="User Icon"
          className="object-fit rounded-full w-max h-max hover:cursor-pointer"
        />

        {profileOpened && (
          <div className="flex flex-col absolute bottom-[-300%] right-0 w-[200px] bg-white rounded-2xl shadow-2xl z-30">
            <button
              className="w-full p-2 bg-white hover:cursor-pointer transition-colors hover:bg-gray-200 rounded-t-2xl"
              onClick={() => signOut()}
            >
              Log out
            </button>

            <button
              className="w-full p-2 bg-white hover:cursor-pointer transition-colors hover:bg-red-500 hover:text-white rounded-b-2xl"
              onClick={deleteTheAccount}
            >
              Delete account
            </button>
          </div>
        )}
      </div>
    </div>
  )
}