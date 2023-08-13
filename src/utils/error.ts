import * as SecureStore from "expo-secure-store";
import { DevSettings } from "react-native";

export interface ErrorJson {
  // error: string === error.message
  // statusCode: number === error.code
  message: string;
}

export async function catchBackendError<T>(res: Response) {
  if (!res.ok) {
    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    let message = res.statusText;
    if (isJson) {
      const json = (await res.json()) as ErrorJson;
      message = json.message;
    }

    if (message === "jwt expired") {
      await SecureStore.deleteItemAsync("token");
      DevSettings.reload();
    }

    console.log(`=> ${res.url} code`, message, res.status);
    return Promise.reject(message);
  }

  return (await res.json()) as T;
}
