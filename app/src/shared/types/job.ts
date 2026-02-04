export type Job = {
  id: string;
  title: string;
  hours: string;
  riskScore: number;
  riskLevel: "낮음" | "보통" | "높음" | "매우 높음";
  description: string;
  conditions: string[];
  reasons: {
    force: string;
    repetition: string;
    accident: string;
  };
};
