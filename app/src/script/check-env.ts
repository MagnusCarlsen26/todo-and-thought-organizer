async function checkEnv() {

    const url = process.env.EXPO_PUBLIC_SERVER_URL;
    if (!url) {
        process.exit(1);
    }
    
}

checkEnv();