import "react-native-gesture-handler";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { NotificationContext } from "./src/context/notification";
import RootNavigation from "./src/navigation";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token: string | undefined;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use a physical device for Push Notifications");
  }

  return token;
}

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [tokenExpoPushNotif, setTokenExpoPushNotif] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setTokenExpoPushNotif(token);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NativeBaseProvider>
      <NotificationContext.Provider
        value={{ tokenExpoPushNotif: tokenExpoPushNotif }}
      >
        <RootNavigation />
      </NotificationContext.Provider>
    </NativeBaseProvider>
  );
}
