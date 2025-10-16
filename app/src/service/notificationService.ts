import * as Notifications from 'expo-notifications';

export async function scheduleNotification(
    title: string,
    body: string,
    trigger: Notifications.NotificationTriggerInput | null
): Promise<string | null> {

    try {

        return await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
            },
            trigger
        });

    } catch (error) {
        console.error('[scheduleNotification] Exception caught:', error);
        return null;
    }
}