import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AlertCircle, AlertTriangle, ArrowLeft, CheckCircle, Clock } from "lucide-react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { colors } from "@/theme/colors";
import { jobs } from "@/shared/data/jobs";
import { getAuthenticated } from "@/shared/storage/authStorage";
import { Card } from "@/ui/Card";
import { Screen } from "@/ui/Screen";

const getRiskColor = (level: string) => {
  switch (level) {
    case "낮음":
      return { text: "#16A34A", bg: "#DCFCE7" };
    case "보통":
      return { text: "#CA8A04", bg: "#FEF3C7" };
    case "높음":
      return { text: "#EA580C", bg: "#FFEDD5" };
    case "매우 높음":
      return { text: "#DC2626", bg: "#FEE2E2" };
    default:
      return { text: colors.mutedText, bg: colors.muted };
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case "낮음":
      return CheckCircle;
    case "보통":
      return AlertCircle;
    case "높음":
    case "매우 높음":
      return AlertTriangle;
    default:
      return AlertCircle;
  }
};

export default function JobListScreen() {
  useEffect(() => {
    const guard = async () => {
      const isAuth = await getAuthenticated();
      if (!isAuth) {
        Toast.show({ type: "error", text1: "본인 인증이 필요합니다." });
        router.replace("/login");
      }
    };
    guard();
  }, []);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/guide")} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>배치 결과 목록</Text>
      </View>

      <View style={styles.list}>
        {jobs.map((job) => {
          const RiskIcon = getRiskIcon(job.riskLevel);
          const riskStyle = getRiskColor(job.riskLevel);
          return (
            <Pressable
              key={job.id}
              onPress={() => router.push(`/job-detail/${job.id}`)}
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <View style={[styles.riskBadge, { backgroundColor: riskStyle.bg }]}>
                    <RiskIcon color={riskStyle.text} size={14} />
                    <Text style={[styles.riskText, { color: riskStyle.text }]}>
                      {job.riskLevel}
                    </Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Clock color={colors.mutedText} size={14} />
                    <Text style={styles.metaText}>{job.hours}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <AlertCircle color={colors.mutedText} size={14} />
                    <Text style={styles.metaText}>위험도 {job.riskScore}%</Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
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
  list: {
    gap: 14,
  },
  pressed: {
    opacity: 0.9,
  },
  card: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  riskBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  riskText: {
    fontSize: 12,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    gap: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.mutedText,
  },
});
