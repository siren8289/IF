import AsyncStorage from "@react-native-async-storage/async-storage";

const SELECTED_JOB_KEY = "selectedJobId";

export async function setSelectedJobId(jobId: string) {
  await AsyncStorage.setItem(SELECTED_JOB_KEY, jobId);
}

export async function getSelectedJobId(): Promise<string | null> {
  return AsyncStorage.getItem(SELECTED_JOB_KEY);
}

export async function clearSelectedJobId() {
  await AsyncStorage.removeItem(SELECTED_JOB_KEY);
}
