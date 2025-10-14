import { Pressable, Text, View } from "react-native";

import { ScreenStates } from "../../tabs/AddScreen";
import { stateConfig } from "../../constants/addScreen/stateConfig";

export default function StateTransitionButtons({
    currState,
    setCurrState
}: {
    currState: ScreenStates;
    setCurrState: (state: ScreenStates) => void;
}) {

    return (
        <View className='flex-column justify-center items-center gap-2 w-full mt-16'>
            {stateConfig[currState].transitionButtons.map((button) => (
                <StateTransitionButton 
                    key={button.buttonText} 
                    buttonConfig={button}
                    setCurrState={setCurrState} 
                />
            ))}
        </View>
    );
}   

type StateTransitionButtonProps = {
    buttonConfig: {
        buttonText: string;
        onClickTransition: ScreenStates;
        bgColor: string;
    };
    setCurrState: (state: ScreenStates) => void;
};

function StateTransitionButton({
    buttonConfig,
    setCurrState,
}: StateTransitionButtonProps) {

    return (
        <Pressable 
            onPress={() => setCurrState(buttonConfig.onClickTransition)}
            className={`${buttonConfig.bgColor} w-full py-6 border-2 rounded-3xl`}
        >
            <Text className="text-white text-center font-bold text-2xl">
                {buttonConfig.buttonText}
            </Text>
        </Pressable>
    );
}
