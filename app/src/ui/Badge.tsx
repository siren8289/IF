import type { ViewStyle, TextStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
  backgroundColor: string;
  textColor: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Badge({ label, backgroundColor, textColor, style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <Text style={[styles.text, { color: textColor }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});
