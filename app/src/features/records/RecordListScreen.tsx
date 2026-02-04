import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ArrowLeft, ChevronRight, Search } from "lucide-react-native";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { router } from "expo-router";

import { colors } from "@/theme/colors";
import { Card } from "@/ui/Card";
import { Screen } from "@/ui/Screen";
import { getRecords } from "@/shared/storage/riskStorage";
import type { RiskRecord } from "@/shared/types/risk";
import { getRiskLevel } from "@/shared/utils/risk";

export default function RecordListScreen() {
  const [records, setRecords] = useState<RiskRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadRecords = async () => {
      const stored = await getRecords();
      setRecords(stored);
    };

    loadRecords();
  }, []);

  const filteredRecords = useMemo(() => {
    if (!searchTerm) return records;
    return records.filter(
      (record) =>
        record.job.includes(searchTerm) || String(record.age).includes(searchTerm)
    );
  }, [records, searchTerm]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/home")} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>최근 판단 기록</Text>
      </View>

      <View style={styles.searchWrapper}>
        <Search color={colors.mutedText} size={18} />
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="직무 또는 연령으로 검색"
          placeholderTextColor={colors.mutedText}
          style={styles.searchInput}
        />
      </View>

      {filteredRecords.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>저장된 기록이 없습니다</Text>
          <Pressable onPress={() => router.push("/applicant-form")}>
            <Text style={styles.emptyLink}>새로운 판단 시작하기</Text>
          </Pressable>
        </Card>
      ) : (
        <View style={styles.list}>
          {filteredRecords.map((record) => {
            const riskLevel = getRiskLevel(record.riskScore);
            return (
              <Pressable
                key={record.id}
                onPress={() => router.push(`/records/${record.id}`)}
                style={({ pressed }: { pressed: boolean }) => [pressed && styles.pressed]}
              >
                <Card style={styles.listItem}>
                  <View style={styles.listHeader}>
                    <View style={styles.riskRow}>
                      <View
                        style={[
                          styles.riskScore,
                          { backgroundColor: riskLevel.backgroundColor },
                        ]}
                      >
                        <Text style={[styles.riskScoreText, { color: riskLevel.textColor }]}>
                          {record.riskScore}점
                        </Text>
                      </View>
                      <Text style={styles.riskLabel}>{riskLevel.level}</Text>
                    </View>
                    <ChevronRight color={colors.mutedText} size={18} />
                  </View>

                  <View style={styles.listGrid}>
                    <InfoLine label="연령 / 직무" value={`${record.age}세 / ${record.job}`} />
                    <InfoLine label="신체 기능" value={record.physicalLevel} />
                  </View>

                  <Text style={styles.dateText}>
                    {format(new Date(record.timestamp), "yyyy년 MM월 dd일 HH:mm", { locale: ko })}
                  </Text>
                </Card>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

type InfoLineProps = {
  label: string;
  value: string;
};

function InfoLine({ label, value }: InfoLineProps) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  emptyCard: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 32,
  },
  emptyText: {
    color: colors.mutedText,
    fontSize: 14,
  },
  emptyLink: {
    color: colors.secondary,
    fontWeight: "600",
  },
  list: {
    gap: 14,
  },
  pressed: {
    opacity: 0.9,
  },
  listItem: {
    gap: 12,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  riskScore: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  riskScoreText: {
    fontSize: 13,
    fontWeight: "700",
  },
  riskLabel: {
    fontSize: 12,
    color: colors.mutedText,
  },
  listGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  infoLine: {
    width: "47%",
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.mutedText,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  dateText: {
    fontSize: 12,
    color: colors.mutedText,
  },
});
