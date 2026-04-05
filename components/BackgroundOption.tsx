"use client"

import Image from "next/image"
import { StaticImageData } from "next/image"

type Props = {
  backgroundURL: string
  background: StaticImageData
  chosenBackground: string
  setChosenBackground: React.Dispatch<React.SetStateAction<string>>
}

export default function BackgroundOption({ backgroundURL, background, chosenBackground, setChosenBackground }: Props) {
  return (
    <button
      className="hover:cursor-pointer relative"
      onClick={() => setChosenBackground(backgroundURL)}
    >
      <Image
        src={background}
        alt="Background 1"
        width={200}
        height={200}
        className="object-cover object-center w-[100px] h-[50px] rounded-md"
      />

      <div className={`
        absolute top-0 left-0 w-full h-full bg-black rounded-md opacity-0 transition-opacity 
        ${chosenBackground === backgroundURL
          ? "opacity-40"
          : "hover:opacity-20"}
        `}
      />
    </button>
  )
}