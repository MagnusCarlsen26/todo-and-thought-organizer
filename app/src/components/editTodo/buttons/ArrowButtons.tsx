import { Pressable } from "react-native";
import LeftArrowSvg from "../../../assets/svgs/leftArrowSvg";
import RightArrowSvg from "../../../assets/svgs/rightArrowSvg";

export function LeftButtons({ goToPrevious, disabled }: { goToPrevious: () => void, disabled: boolean }) {
    return (
        <Pressable
            className='border border-gray-400 px-10 py-4 rounded-md disabled:opacity-50 flex-row items-center'
            onPress={goToPrevious}
            disabled={disabled}
        >
            <LeftArrowSvg stroke={'#9ca3af'} width={20} height={20} />
        </Pressable>
    )
}

export function RightButtons({ goToNext, disabled }: { goToNext: () => void, disabled: boolean }) {
    return (
        <Pressable
            className='border border-gray-400 px-10 py-4 rounded-md disabled:opacity-50 flex-row items-center'
            onPress={goToNext}
            disabled={disabled}
        >
            <RightArrowSvg stroke={'#9ca3af'} width={20} height={20} />
        </Pressable>
    )
}