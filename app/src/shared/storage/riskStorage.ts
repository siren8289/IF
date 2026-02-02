import AsyncStorage from "@react-native-async-storage/async-storage";

import type { RiskRecord } from "@/shared/types/risk";

const CURRENT_RESULT_KEY = "currentResult";
const RECORDS_KEY = "riskRecords";

export async function getCurrentResult(): Promise<RiskRecord | null> {
  const stored = await AsyncStorage.getItem(CURRENT_RESULT_KEY);
  return stored ? (JSON.parse(stored) as RiskRecord) : null;
}

export async function setCurrentResult(result: RiskRecord): Promise<void> {
  await AsyncStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify(result));
}

export async function clearCurrentResult(): Promise<void> {
  await AsyncStorage.removeItem(CURRENT_RESULT_KEY);
}

export async function getRecords(): Promise<RiskRecord[]> {
  const stored = await AsyncStorage.getItem(RECORDS_KEY);
  return stored ? (JSON.parse(stored) as RiskRecord[]) : [];
}

export async function saveRecord(record: RiskRecord): Promise<RiskRecord[]> {
  const existing = await getRecords();
  const updated = [record, ...existing];
  await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(updated));
  return updated;
}
