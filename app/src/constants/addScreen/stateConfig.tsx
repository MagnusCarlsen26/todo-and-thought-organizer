import { ScreenStates } from "../../tabs/AddScreen";

export const stateConfig: Record<ScreenStates, {
    mainButtonText: string;
    isBorderAnimation: boolean;
    waveAnimationState: "none" | "running" | "still";
    onClickTransition: ScreenStates | null;
    transitionButtons: {
        buttonText: string;
        onClickTransition: ScreenStates;
        bgColor: string;
    }[];
}> = {
    "idle": {
        "mainButtonText": "Start",
        "isBorderAnimation": false,
        "waveAnimationState": "none",
        "onClickTransition": "recording",
        "transitionButtons": []
    },
    "recording": {
        "mainButtonText": "Listening...",
        "isBorderAnimation": true,
        "waveAnimationState": "running",
        "onClickTransition": null,
        "transitionButtons": [
            {
                "buttonText": "Pause",
                "onClickTransition": "paused",
                "bgColor": "bg-emerald-700"
            },
            {
                "buttonText": "Cancel",
                "onClickTransition": "idle",
                "bgColor": "bg-red-500"
            },
            {
                "buttonText": "Done",
                "onClickTransition": "processing",
                "bgColor": "bg-green-500"
            }
        ]
    },
    "paused": {
        "mainButtonText": "Paused",
        "isBorderAnimation": false,
        "waveAnimationState": "still",
        "onClickTransition": "recording",
        "transitionButtons": [
            {
                "buttonText": "Resume",
                "onClickTransition": "recording",
                "bgColor": "bg-emerald-700"
            },
            {
                "buttonText": "Cancel",
                "onClickTransition": "idle",
                "bgColor": "bg-red-500"
            },
            {
                "buttonText": "Done",
                "onClickTransition": "processing",
                "bgColor": "bg-green-500"
            }
        ]
    },
    "processing": {
        "mainButtonText": "Processing...",
        "isBorderAnimation": false,
        "waveAnimationState": "none",
        "onClickTransition": null,
        "transitionButtons": [
            // TODO: Will think of cancel button later
            // {
            //     "buttonText": "Cancel",
            //     "onClickTransition": "idle",
            //     "bgColor": "bg-red-500"
            // }
        ]
    }

}