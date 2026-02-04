import { StyleSheet, Text, View, Pressable } from "react-native";
import { FileText, Info, Shield, UserPlus, Briefcase } from "lucide-react-native";
import { router } from "expo-router";

import { colors } from "@/theme/colors";
import { Card } from "@/ui/Card";
import { Screen } from "@/ui/Screen";

const menuItems = [
  {
    icon: Briefcase,
    title: "일자리 확인",
    description: "추천 일자리 목록을 확인하고 선택합니다",
    path: "/guide",
    color: colors.primary,
  },
  {
    icon: UserPlus,
    title: "새 위험도 확인",
    description: "신청자 정보를 입력하여 고용 위험도를 판단합니다",
    path: "/applicant-form",
    color: colors.secondary,
  },
  {
    icon: FileText,
    title: "최근 판단 기록",
    description: "이전에 확인한 위험도 판단 기록을 조회합니다",
    path: "/records",
    color: colors.info,
  },
  {
    icon: Info,
    title: "앱 안내",
    description: "서비스 사용 방법 및 안내사항을 확인합니다",
    path: "/service-info",
    color: colors.mutedText,
  },
];

export default function HomeScreen() {
  return (
    <Screen scroll>
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View style={styles.headerIcon}>
            <Shield color="#FFFFFF" size={38} />
          </View>
          <View>
            <Text style={styles.headerTitle}>If</Text>
            <Text style={styles.headerSubtitle}>노약자 고용 위험도 판단 시스템</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => router.push(item.path)}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuPressed]}
          >
            <Card style={styles.menuCard}>
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <item.icon color="#FFFFFF" size={24} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
  },
  menuGrid: {
    gap: 16,
  },
  menuItem: {
    borderRadius: 18,
  },
  menuPressed: {
    opacity: 0.9,
  },
  menuCard: {
    gap: 10,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  menuDescription: {
    fontSize: 13,
    color: colors.mutedText,
    lineHeight: 18,
  },
});
