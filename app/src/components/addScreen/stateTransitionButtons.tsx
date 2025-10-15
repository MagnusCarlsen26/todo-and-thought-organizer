import { Pressable, Text, View } from "react-native";

import { ScreenStates } from "../../tabs/AddScreen";
import { stateConfig } from "../../constants/addScreen/stateConfig";

export default function StateTransitionButtons({
    currState,
    handleStateChange
}: {
    currState: ScreenStates;
    handleStateChange: (state: ScreenStates) => void;
}) {

    const buttons = stateConfig[currState].transitionButtons;

    return (
        <View className='flex-column gap-1 w-full mt-16 mb-4'>

            {buttons[0] && (
                <StateTransitionButton 
                    key={buttons[0].buttonText} 
                    buttonConfig={buttons[0]}
                    handleStateChange={handleStateChange}
                    isFirst={true}
                />
            )}

            <View className="flex flex-row gap-1">
                {buttons.slice(1).map((button) => (
                    <StateTransitionButton 
                        key={button.buttonText} 
                        buttonConfig={button}
                        handleStateChange={handleStateChange}
                        isFirst={false}
                    />
                ))}
            </View>
        </View>
    );
}   

type StateTransitionButtonProps = {
    buttonConfig: {
        buttonText: string;
        onClickTransition: ScreenStates;
        bgColor: string;
    };
    handleStateChange: (state: ScreenStates) => void;
    isFirst?: boolean;
};

function StateTransitionButton({
    buttonConfig,
    handleStateChange,
    isFirst,
}: StateTransitionButtonProps) {

    return (
        <Pressable 
            onPress={() => handleStateChange(buttonConfig.onClickTransition)}
            className={`${buttonConfig.bgColor} ${isFirst ? 'py-8' : ' w-1/2 py-4'} border-2 rounded-3xl`}
        >
            <Text className="text-white text-center font-bold text-2xl">
                {buttonConfig.buttonText}
            </Text>
        </Pressable>
    );
}
