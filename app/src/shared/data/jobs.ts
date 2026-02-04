import type { Job } from "@/shared/types/job";

export const jobs: Job[] = [
  {
    id: "1",
    title: "공원 환경 미화",
    hours: "하루 3시간",
    riskScore: 20,
    riskLevel: "낮음",
    description: "공원 내 쓰레기를 줍고 벤치를 정리하는 가벼운 업무입니다.",
    conditions: ["오전 9시 ~ 12시", "주 3회 근무", "휴식 시간 보장"],
    reasons: {
      force: "무거운 물건을 들 일이 거의 없음",
      repetition: "다양한 동작으로 반복성 낮음",
      accident: "공원 내 평지 이동으로 낙상 위험 낮음",
    },
  },
  {
    id: "2",
    title: "학교 급식 보조",
    hours: "하루 4시간",
    riskScore: 45,
    riskLevel: "보통",
    description: "초등학교 급식실에서 배식을 돕고 식탁을 정리합니다.",
    conditions: ["오전 11시 ~ 오후 3시", "주 5회 근무", "식사 제공"],
    reasons: {
      force: "식판 운반 시 약간의 힘 필요",
      repetition: "배식 동작의 반복 있음",
      accident: "물기 있는 바닥 주의 필요",
    },
  },
  {
    id: "3",
    title: "아파트 단지 경비",
    hours: "하루 6시간",
    riskScore: 75,
    riskLevel: "높음",
    description: "아파트 단지 순찰 및 택배 보관소 관리를 담당합니다.",
    conditions: ["오후 1시 ~ 오후 7시", "주 5회 근무", "순찰 업무 포함"],
    reasons: {
      force: "택배 물품 정리 시 근력 필요",
      repetition: "장시간 서 있거나 걷는 동작",
      accident: "계단 이동 및 야간 순찰 시 주의",
    },
  },
];
