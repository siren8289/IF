import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react-native";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "@/theme/colors";
import { Card } from "@/ui/Card";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { Screen } from "@/ui/Screen";
import { getRecords } from "@/shared/storage/riskStorage";
import type { RiskRecord } from "@/shared/types/risk";
import { getRiskLevel } from "@/shared/utils/risk";

export default function RecordDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [record, setRecord] = useState<RiskRecord | null>(null);

  useEffect(() => {
    const loadRecord = async () => {
      const records = await getRecords();
      const found = records.find((item) => item.id === id);
      if (!found) {
        router.replace("/records");
        return;
      }
      setRecord(found);
    };

    loadRecord();
  }, [id]);

  const riskLevel = useMemo(() => (record ? getRiskLevel(record.riskScore) : null), [record]);

  if (!record || !riskLevel) {
    return <Screen />;
  }

  const Icon =
    riskLevel.level === "매우 높음"
      ? AlertTriangle
      : riskLevel.level === "높음" || riskLevel.level === "보통"
      ? AlertCircle
      : CheckCircle;

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/records")} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>기록 상세</Text>
      </View>

      <View style={styles.stack}>
        <Card style={styles.card}>
          <Text style={styles.dateText}>
            {format(new Date(record.timestamp), "yyyy년 MM월 dd일 HH:mm", { locale: ko })}
          </Text>
          <View style={[styles.scoreCard, { backgroundColor: riskLevel.backgroundColor }]}>
            <Icon color={riskLevel.textColor} size={64} />
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{record.riskScore}</Text>
              <Text style={styles.scoreMax}>/ 100</Text>
            </View>
            <Text style={[styles.scoreLabel, { color: riskLevel.textColor }]}>{riskLevel.level}</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>상세 정보</Text>
          <DetailRow label="연령" value={`${record.age}세`} />
          <DetailRow label="직무" value={record.job} />
          <DetailRow label="신체 기능 수준" value={record.physicalLevel} />
          <DetailRow label="기저 질환" value={record.hasMedicalCondition ? "있음" : "없음"} />
          <DetailRow label="근무 시간" value={record.workHours} />
          <DetailRow label="근무 강도" value={record.workIntensity} isLast />
        </Card>

        <PrimaryButton label="홈으로 돌아가기" onPress={() => router.replace("/home")} />
      </View>
    </Screen>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function DetailRow({ label, value, isLast = false }: DetailRowProps) {
  return (
    <View style={[styles.detailRow, !isLast && styles.detailDivider]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
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
  stack: {
    gap: 20,
  },
  card: {
    gap: 12,
  },
  dateText: {
    fontSize: 12,
    color: colors.mutedText,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  scoreValue: {
    fontSize: 46,
    fontWeight: "700",
    color: colors.text,
  },
  scoreMax: {
    fontSize: 16,
    color: colors.mutedText,
    paddingBottom: 6,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    color: colors.mutedText,
    fontSize: 13,
  },
  detailValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
});
