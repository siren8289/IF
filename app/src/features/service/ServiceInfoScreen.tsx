import { Pressable, StyleSheet, Text, View } from "react-native";
import { AlertCircle, ArrowLeft, FileCheck, Shield, UserCheck } from "lucide-react-native";
import { router } from "expo-router";

import { colors } from "@/theme/colors";
import { Card } from "@/ui/Card";
import { Screen } from "@/ui/Screen";

const sections = [
  {
    icon: Shield,
    title: "서비스 개요",
    content:
      "노약자 고용 위험도 판단 시스템은 신청자의 연령, 건강 상태, 직무 특성 등을 종합적으로 분석하여 고용 시 발생할 수 있는 위험도를 객관적으로 평가합니다.",
  },
  {
    icon: UserCheck,
    title: "평가 항목",
    content:
      "연령, 직무 유형, 신체 기능 수준, 기저 질환 여부, 근무 시간 및 강도 등 6가지 주요 항목을 기반으로 종합적인 위험도를 산출합니다.",
  },
  {
    icon: FileCheck,
    title: "활용 방법",
    content:
      "판단된 위험도는 고용 결정의 참고 자료로 활용되며, 높은 위험도가 나온 경우 추가적인 안전 조치나 근무 환경 개선이 필요할 수 있습니다.",
  },
  {
    icon: AlertCircle,
    title: "주의사항",
    content:
      "본 시스템의 판단 결과는 참고용이며, 최종 고용 결정은 관련 법규와 기업의 정책을 종합적으로 고려하여 이루어져야 합니다.",
  },
];

export default function ServiceInfoScreen() {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/home")} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>서비스 안내</Text>
      </View>

      <View style={styles.stack}>
        {sections.map((section) => (
          <Card key={section.title} style={styles.card}>
            <View style={styles.sectionRow}>
              <View style={styles.sectionIcon}>
                <section.icon color="#FFFFFF" size={22} />
              </View>
              <View style={styles.sectionBody}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionText}>{section.content}</Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={[styles.card, styles.highlightCard]}>
          <Text style={styles.highlightTitle}>위험도 구간 안내</Text>
          <View style={styles.riskRow}>
            <RiskBadge label="낮음" background="#DCFCE7" text="#166534" />
            <Text style={styles.riskText}>0-29점: 일반적인 고용 환경 적합</Text>
          </View>
          <View style={styles.riskRow}>
            <RiskBadge label="보통" background="#FEF3C7" text="#92400E" />
            <Text style={styles.riskText}>30-49점: 주의 관찰 필요</Text>
          </View>
          <View style={styles.riskRow}>
            <RiskBadge label="높음" background="#FFEDD5" text="#9A3412" />
            <Text style={styles.riskText}>50-69점: 안전 조치 강화 권장</Text>
          </View>
          <View style={styles.riskRow}>
            <RiskBadge label="매우높음" background="#FEE2E2" text="#991B1B" />
            <Text style={styles.riskText}>70-100점: 종합적 검토 필수</Text>
          </View>
        </Card>

        <Card style={styles.contactCard}>
          <Text style={styles.contactText}>
            문의 사항이 있으시면 담당 부서로 연락 주시기 바랍니다.
          </Text>
          <Text style={styles.contactDetail}>Tel: 02-1234-5678</Text>
          <Text style={styles.contactDetail}>Email: support@risk-assessment.com</Text>
        </Card>
      </View>
    </Screen>
  );
}

type RiskBadgeProps = {
  label: string;
  background: string;
  text: string;
};

function RiskBadge({ label, background, text }: RiskBadgeProps) {
  return (
    <View style={[styles.riskBadge, { backgroundColor: background }]}>
      <Text style={[styles.riskBadgeText, { color: text }]}>{label}</Text>
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
    gap: 16,
  },
  card: {
    gap: 12,
  },
  sectionRow: {
    flexDirection: "row",
    gap: 12,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBody: {
    flex: 1,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  sectionText: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
  },
  highlightCard: {
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: "#E0F2FE",
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 6,
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  riskBadge: {
    width: 70,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  riskText: {
    fontSize: 12,
    color: colors.text,
    flexShrink: 1,
  },
  contactCard: {
    alignItems: "center",
    gap: 6,
  },
  contactText: {
    fontSize: 12,
    color: colors.mutedText,
    textAlign: "center",
  },
  contactDetail: {
    color: colors.primary,
    fontWeight: "600",
  },
});
