import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ArrowLeft, CheckCircle2 } from "lucide-react-native";
import { router } from "expo-router";

import { colors } from "@/theme/colors";
import { Card } from "@/ui/Card";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { Screen } from "@/ui/Screen";
import { setCurrentResult } from "@/shared/storage/riskStorage";
import type { ApplicantData, RiskRecord } from "@/shared/types/risk";
import { calculateRiskScore } from "@/shared/utils/risk";

const jobs = ["사무직", "서비스직", "제조/생산직", "건설/노무직", "농림어업", "기타"];
const physicalLevels = ["우수", "양호", "보통", "미흡"];
const workHoursOptions = ["4시간 미만", "4-6시간", "6-8시간", "8시간 이상"];
const workIntensityOptions = ["낮음", "보통", "높음", "매우 높음"];

const initialForm: ApplicantData = {
  age: 0,
  job: "",
  physicalLevel: "",
  hasMedicalCondition: false,
  workHours: "",
  workIntensity: "",
};

export default function ApplicantFormScreen() {
  const [formData, setFormData] = useState<ApplicantData>(initialForm);
  const isFormValid =
    formData.age > 0 &&
    formData.job &&
    formData.physicalLevel &&
    formData.workHours &&
    formData.workIntensity;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    const riskScore = calculateRiskScore(formData);
    const result: RiskRecord = {
      ...formData,
      riskScore,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };

    await setCurrentResult(result);
    router.push("/risk-result");
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/home")} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={20} />
        </Pressable>
        <Text style={styles.headerTitle}>신청자 정보 입력</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>연령 (만 나이)</Text>
          <TextInput
            value={formData.age ? String(formData.age) : ""}
            onChangeText={(value) =>
              setFormData({ ...formData, age: Number.parseInt(value || "0", 10) || 0 })
            }
            placeholder="연령을 입력하세요"
            placeholderTextColor={colors.mutedText}
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>직무 선택</Text>
          <View style={styles.optionGrid}>
            {jobs.map((job) => (
              <OptionButton
                key={job}
                label={job}
                selected={formData.job === job}
                onPress={() => setFormData({ ...formData, job })}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>신체 기능 수준</Text>
          <View style={styles.optionGrid}>
            {physicalLevels.map((level) => (
              <OptionButton
                key={level}
                label={level}
                selected={formData.physicalLevel === level}
                onPress={() => setFormData({ ...formData, physicalLevel: level })}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>주요 질환 여부</Text>
          <Pressable
            onPress={() =>
              setFormData({ ...formData, hasMedicalCondition: !formData.hasMedicalCondition })
            }
            style={[
              styles.toggleButton,
              formData.hasMedicalCondition && styles.toggleButtonActive,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                formData.hasMedicalCondition && styles.toggleTextActive,
              ]}
            >
              만성 질환 또는 주요 건강 문제 있음
            </Text>
            {formData.hasMedicalCondition && <CheckCircle2 color={colors.secondary} size={20} />}
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>근무 시간</Text>
          <View style={styles.optionGrid}>
            {workHoursOptions.map((hours) => (
              <OptionButton
                key={hours}
                label={hours}
                selected={formData.workHours === hours}
                onPress={() => setFormData({ ...formData, workHours: hours })}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>근무 강도</Text>
          <View style={styles.optionGrid}>
            {workIntensityOptions.map((intensity) => (
              <OptionButton
                key={intensity}
                label={intensity}
                selected={formData.workIntensity === intensity}
                onPress={() => setFormData({ ...formData, workIntensity: intensity })}
              />
            ))}
          </View>
        </View>
      </Card>

      <PrimaryButton
        label="위험도 확인"
        onPress={handleSubmit}
        disabled={!isFormValid}
        style={styles.submitButton}
      />
    </Screen>
  );
}

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function OptionButton({ label, selected, onPress }: OptionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionButton,
        selected && styles.optionSelected,
        pressed && styles.optionPressed,
      ]}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
    </Pressable>
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
  card: {
    gap: 20,
  },
  field: {
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
  },
  optionSelected: {
    borderColor: colors.secondary,
    backgroundColor: "#E0F2FE",
  },
  optionPressed: {
    opacity: 0.9,
  },
  optionText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  optionTextSelected: {
    color: colors.secondary,
  },
  toggleButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.inputBackground,
  },
  toggleButtonActive: {
    borderColor: colors.secondary,
    backgroundColor: "#E0F2FE",
  },
  toggleText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  toggleTextActive: {
    color: colors.secondary,
  },
  submitButton: {
    marginTop: 20,
  },
});
