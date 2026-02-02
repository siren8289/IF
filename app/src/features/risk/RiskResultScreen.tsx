import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowLeft, AlertCircle, AlertTriangle, CheckCircle, Save } from "lucide-react-native";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import { colors } from "@/theme/colors";
import { Card } from "@/ui/Card";
import { Screen } from "@/ui/Screen";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { clearCurrentResult, getCurrentResult, saveRecord } from "@/shared/storage/riskStorage";
import type { RiskRecord } from "@/shared/types/risk";
import { getRiskLevel } from "@/shared/utils/risk";

export default function RiskResultScreen() {
  const [result, setResult] = useState<RiskRecord | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      const stored = await getCurrentResult();
      if (!stored) {
        router.replace("/home");
        return;
      }
      setResult(stored);
    };

    loadResult();
  }, []);

  const riskLevel = useMemo(() => (result ? getRiskLevel(result.riskScore) : null), [result]);

  const contributingFactors = useMemo(() => {
    if (!result) return [];
    const factors = [];
    if (result.age >= 65) factors.push({ text: "고령 (65세 이상)", impact: "높음" });
    if (result.job === "건설/노무직") factors.push({ text: "고위험 직무", impact: "높음" });
    if (result.physicalLevel === "미흡") factors.push({ text: "신체 기능 미흡", impact: "높음" });
    if (result.hasMedicalCondition) factors.push({ text: "기저 질환 있음", impact: "중간" });
    if (result.workIntensity === "매우 높음") factors.push({ text: "높은 근무 강도", impact: "중간" });
    if (result.workHours === "8시간 이상") factors.push({ text: "장시간 근무", impact: "낮음" });
    return factors.slice(0, 3);
  }, [result]);

  if (!result || !riskLevel) {
    return <Screen />;
  }

  const Icon =
    riskLevel.level === "매우 높음"
      ? AlertTriangle
      : riskLevel.level === "높음" || riskLevel.level === "보통"
      ? AlertCircle
      : CheckCircle;

  const handleSave = async () => {
    await saveRecord(result);
    await clearCurrentResult();
    Toast.show({
      type: "success",
      text1: "기록이 저장되었습니다",
      text2: "최근 판단 기록에서 확인할 수 있습니다.",
    });

    setTimeout(() => {
      router.replace("/home");
    }, 1200);
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/home")} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>위험도 결과</Text>
      </View>

      <View style={styles.stack}>
        <View style={[styles.scoreCard, { backgroundColor: riskLevel.backgroundColor }]}>
          <View style={styles.scoreIcon}>
            <Icon color={riskLevel.textColor} size={70} />
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{result.riskScore}</Text>
            <Text style={styles.scoreMax}>/ 100</Text>
          </View>
          <Text style={[styles.scoreLabel, { color: riskLevel.textColor }]}>{riskLevel.level}</Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>신청자 정보</Text>
          <View style={styles.infoGrid}>
            <InfoItem label="연령" value={`${result.age}세`} />
            <InfoItem label="직무" value={result.job} />
            <InfoItem label="신체 기능" value={result.physicalLevel} />
            <InfoItem label="질환 여부" value={result.hasMedicalCondition ? "있음" : "없음"} />
            <InfoItem label="근무 시간" value={result.workHours} />
            <InfoItem label="근무 강도" value={result.workIntensity} />
          </View>
        </Card>

        {contributingFactors.length > 0 && (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>핵심 위험 요인</Text>
            <View style={styles.factorList}>
              {contributingFactors.map((factor) => (
                <View key={factor.text} style={styles.factorItem}>
                  <Text style={styles.factorText}>{factor.text}</Text>
                  <View
                    style={[
                      styles.factorBadge,
                      factor.impact === "높음"
                        ? styles.badgeHigh
                        : factor.impact === "중간"
                        ? styles.badgeMedium
                        : styles.badgeLow,
                    ]}
                  >
                    <Text style={styles.badgeText}>{factor.impact}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        )}

        <SecondaryButton
          label="기록 저장"
          onPress={handleSave}
          icon={<Save color="#FFFFFF" size={18} />}
        />
      </View>
    </Screen>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
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
  stack: {
    gap: 20,
  },
  scoreCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  scoreIcon: {
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: "700",
    color: colors.text,
  },
  scoreMax: {
    fontSize: 20,
    color: colors.mutedText,
    paddingBottom: 8,
  },
  scoreLabel: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },
  card: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  infoItem: {
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
  factorList: {
    gap: 10,
  },
  factorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.muted,
  },
  factorText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  factorBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeHigh: {
    backgroundColor: "#FEE2E2",
  },
  badgeMedium: {
    backgroundColor: "#FFEDD5",
  },
  badgeLow: {
    backgroundColor: "#FEF3C7",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
});
