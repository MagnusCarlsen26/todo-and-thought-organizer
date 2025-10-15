import { TouchableOpacity, View, Text } from "react-native";

interface EditSnoozeProps {
    showSnoozePicker: boolean;
    dispatch: (action: any) => void;
    setShowSnoozePicker: (showSnoozePicker: boolean) => void;
}

export default function EditSnooze({ 
    showSnoozePicker, 
    dispatch, 
    setShowSnoozePicker 
}: EditSnoozeProps) {

    if (!showSnoozePicker) return null;

    return (
        <View className="flex-col justify-around w-full mb-4">
            {snoozePresets.map((preset, index) => (
                <View
                    key={index}
                    className="flex-row w-full mb-4 gap-2"
                >
                    {preset.map((item, index) => (
                        <TouchableOpacity 
                            key={index}
                            className="border border-gray-300 rounded-md px-4 py-1"
                            onPress={() => {
                                dispatch({ 
                                    type: "snoozeHours", 
                                    payload: item.value 
                                })
                                setShowSnoozePicker(false)
                            }}
                        >
                            <Text>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
}

const snoozePresets = [
    [
        {
            "label" : "1h",
            "value" : 1
        },
        {
            "label" : "2h",
            "value" : 2
        },
        {
            "label" : "4h",
            "value" : 4
        },
        {
            "label" : "8h",
            "value" : 8
        },
        {
            "label" : "12h",
            "value" : 12
        },
    ],
    [
        {
            "label" : "1d",
            "value" : 24
        },
        {
            "label" : "2d",
            "value" : 48
        },
        {
            "label" : "4d",
            "value" : 96
        }
    ],
    [
        {
            "label" : "1w",
            "value" : 168
        },
        {
            "label" : "2w",
            "value" : 336
        },
        {
            "label" : "1m",
            "value" : 720
        },
        {
            "label" : "2m",
            "value" : 1440
        },
    ]
]