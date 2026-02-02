export type ApplicantData = {
  age: number;
  job: string;
  physicalLevel: string;
  hasMedicalCondition: boolean;
  workHours: string;
  workIntensity: string;
};

export type RiskRecord = ApplicantData & {
  riskScore: number;
  timestamp: string;
  id: string;
};
