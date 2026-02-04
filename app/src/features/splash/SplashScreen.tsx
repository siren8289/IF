import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Shield } from "lucide-react-native";
import { router } from "expo-router";

import { colors } from "@/theme/colors";
import { Screen } from "@/ui/Screen";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen contentStyle={{ padding: 0 }} backgroundColor={colors.primary}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Shield color="#FFFFFF" size={96} strokeWidth={1.5} />
          <View style={styles.iconOverlay}>
            <Shield color="#FFFFFF" size={72} strokeWidth={2} />
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>If</Text>
          <Text style={styles.subtitle}>노약자 고용 위험도 판단 시스템</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 44,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
  },
});
