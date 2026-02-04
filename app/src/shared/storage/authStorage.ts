import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "isAuthenticated";

export async function setAuthenticated(value: boolean) {
  await AsyncStorage.setItem(AUTH_KEY, value ? "true" : "false");
}

export async function getAuthenticated(): Promise<boolean> {
  const stored = await AsyncStorage.getItem(AUTH_KEY);
  return stored === "true";
}
