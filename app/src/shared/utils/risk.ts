import { colors } from "@/theme/colors";
import type { ApplicantData } from "@/shared/types/risk";

export type RiskLevel = {
  level: string;
  textColor: string;
  backgroundColor: string;
};

export function calculateRiskScore(data: ApplicantData) {
  let riskScore = 0;

  if (data.age >= 70) riskScore += 40;
  else if (data.age >= 65) riskScore += 30;
  else if (data.age >= 60) riskScore += 20;
  else riskScore += 10;

  const jobRiskMap: Record<string, number> = {
    "사무직": 5,
    "서비스직": 8,
    "제조/생산직": 12,
    "건설/노무직": 15,
    "농림어업": 12,
    "기타": 8,
  };
  riskScore += jobRiskMap[data.job] || 0;

  const physicalMap: Record<string, number> = {
    "우수": 0,
    "양호": 5,
    "보통": 12,
    "미흡": 20,
  };
  riskScore += physicalMap[data.physicalLevel] || 0;

  if (data.hasMedicalCondition) riskScore += 15;

  const hoursMap: Record<string, number> = {
    "4시간 미만": 0,
    "4-6시간": 2,
    "6-8시간": 4,
    "8시간 이상": 5,
  };
  riskScore += hoursMap[data.workHours] || 0;

  const intensityMap: Record<string, number> = {
    "낮음": 0,
    "보통": 2,
    "높음": 4,
    "매우 높음": 5,
  };
  riskScore += intensityMap[data.workIntensity] || 0;

  return riskScore;
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) {
    return { level: "매우 높음", textColor: colors.danger, backgroundColor: "#FEE2E2" };
  }
  if (score >= 50) {
    return { level: "높음", textColor: "#EA580C", backgroundColor: "#FFEDD5" };
  }
  if (score >= 30) {
    return { level: "보통", textColor: "#CA8A04", backgroundColor: "#FEF3C7" };
  }
  return { level: "낮음", textColor: colors.success, backgroundColor: "#DCFCE7" };
}
