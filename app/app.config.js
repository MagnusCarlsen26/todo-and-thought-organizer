export default ({ config }) => {
    const profile = process.env.EAS_BUILD_PROFILE || "development";

    const PROD_NAME = "Speak2Note";
    const DEV_NAME = "Dev Speak2Note";

    return {
        ...config,
        name: profile === "production" ? PROD_NAME : DEV_NAME,
        slug: "Speak2Note",
        version: "0.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier:
                profile === "production"
                    ? "com.khushalsindhav.speak2note"
                    : "com.khushalsindhav.speak2note.dev",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
            package:
                profile === "production"
                    ? "com.khushalsindhav.speak2note"
                    : "com.khushalsindhav.speak2note.dev",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            eas: {
                projectId: "12296bcb-7376-43ae-881d-f36af21d806f",
            },
        },
        owner: "khushalsindhav",
    };
};