import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckCircle, Home } from "lucide-react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { colors } from "@/theme/colors";
import { jobs } from "@/shared/data/jobs";
import type { Job } from "@/shared/types/job";
import { getAuthenticated } from "@/shared/storage/authStorage";
import { clearSelectedJobId, getSelectedJobId } from "@/shared/storage/selectionStorage";
import { Card } from "@/ui/Card";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { Screen } from "@/ui/Screen";

export default function SelectionCompleteScreen() {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const load = async () => {
      const isAuth = await getAuthenticated();
      if (!isAuth) {
        Toast.show({ type: "error", text1: "본인 인증이 필요합니다." });
        router.replace("/login");
        return;
      }
      const selectedId = await getSelectedJobId();
      const found = jobs.find((item) => item.id === selectedId) ?? null;
      setJob(found);
    };
    load();
  }, []);

  if (!job) {
    return (
      <Screen>
        <Text style={styles.emptyText}>잘못된 접근입니다.</Text>
        <SecondaryButton
          label="처음으로"
          onPress={() => router.replace("/guide")}
          icon={<Home color="#FFFFFF" size={18} />}
        />
      </Screen>
    );
  }

  const handleGoHome = async () => {
    await clearSelectedJobId();
    router.replace("/guide");
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <CheckCircle color="#16A34A" size={44} />
        </View>
        <Text style={styles.title}>
          선택 내용이 행정 담당자에게{"\n"}전달되었습니다
        </Text>
        <Text style={styles.subtitle}>
          담당자가 확인 후 연락드릴 예정입니다.{"\n"}잠시만 기다려주세요.
        </Text>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>선택한 직무 요약</Text>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.conditionsTitle}>근무 조건</Text>
          {job.conditions.map((condition) => (
            <View key={condition} style={styles.conditionRow}>
              <View style={styles.dot} />
              <Text style={styles.conditionText}>{condition}</Text>
            </View>
          ))}
        </Card>

        <SecondaryButton
          label="처음으로 돌아가기"
          onPress={handleGoHome}
          icon={<Home color="#FFFFFF" size={18} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    color: colors.mutedText,
    textAlign: "center",
    lineHeight: 18,
  },
  card: {
    width: "100%",
    gap: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: colors.mutedText,
    fontWeight: "700",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 6,
  },
  conditionsTitle: {
    fontSize: 12,
    color: colors.mutedText,
    fontWeight: "700",
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  conditionText: {
    fontSize: 12,
    color: colors.text,
  },
  emptyText: {
    marginBottom: 16,
    color: colors.mutedText,
  },
});
