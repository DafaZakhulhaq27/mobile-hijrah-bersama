import { createContext } from "react";

interface NotificationContextInterface {
  tokenExpoPushNotif: string;
}

export const NotificationContext = createContext<NotificationContextInterface>({
  tokenExpoPushNotif: "",
});
