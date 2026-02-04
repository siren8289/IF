export interface Assessment {
  id: string;
  date: string;
  applicantName: string;
  age: number;
  healthStatus: string; // 'good', 'average', 'bad'
  workConditions: string[];
  notes: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  riskFactors: string[];
  jobMatches: JobMatch[];
  status: 'Draft' | 'Analyzed' | 'Matched' | 'Completed';
}

export interface JobMatch {
  id: string;
  jobName: string;
  location: string;
  time: string;
  workDays: string[];
  description: string;
  matchedDate: string;
}

export type Page =
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'assessment-form'
  | 'risk-analysis'
  | 'risk-result'
  | 'job-matching'
  | 'app-transfer'
  | 'complete';
