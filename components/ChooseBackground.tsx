import backgrounds from "@/data";
import BackgroundOption from "./BackgroundOption";
import { BackgroundType } from "@/types";

type Props = {
  chosenBackground: string
  setChosenBackground: React.Dispatch<React.SetStateAction<string>>
}

export default function ChooseBackground({ chosenBackground, setChosenBackground }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-gray-700 text-left">Background</span>

      <div className="flex justify-between items-center gap-2 w-full">
        {backgrounds.map((bg: BackgroundType, index: number) =>
          <BackgroundOption
            key={index}
            backgroundURL={bg.url}
            background={bg.background}
            chosenBackground={chosenBackground}
            setChosenBackground={setChosenBackground}
          />
        )}
      </div>
    </div>
  )
}