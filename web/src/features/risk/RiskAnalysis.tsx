import React, { useEffect } from 'react';
import { Page, Assessment } from '@/shared/types/appTypes';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';

interface RiskAnalysisProps {
  onNavigate: (page: Page) => void;
  currentAssessment: Partial<Assessment>;
  onUpdateAssessment: (data: Partial<Assessment>) => void;
}

export function RiskAnalysis({ onNavigate, currentAssessment, onUpdateAssessment }: RiskAnalysisProps) {

  useEffect(() => {
    // Simulate AI calculation
    const timer = setTimeout(() => {
      // Mock Algorithm
      let score = 20;
      const factors: string[] = [];

      if (currentAssessment.age && currentAssessment.age >= 70) {
        score += 30;
        factors.push('고령 (70세 이상)');
      } else if (currentAssessment.age && currentAssessment.age >= 60) {
        score += 15;
      }

      if (currentAssessment.healthStatus === 'bad') {
        score += 40;
        factors.push('건강 상태 주의');
      } else if (currentAssessment.healthStatus === 'average') {
        score += 10;
      }

      if (currentAssessment.workConditions?.includes('야외 근무')) {
        score += 10;
        factors.push('야외 근무 환경');
      }

      // Cap at 95
      score = Math.min(score, 95);

      let level: 'Low' | 'Medium' | 'High' = 'Low';
      if (score >= 70) level = 'High';
      else if (score >= 40) level = 'Medium';

      onUpdateAssessment({
        riskScore: score,
        riskLevel: level,
        riskFactors: factors,
        status: 'Analyzed'
      });

      onNavigate('risk-result');
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentAssessment, onNavigate, onUpdateAssessment]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center max-w-lg w-full text-center">
        <div className="relative mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-[6px] border-[#2F8F6B]/10 border-t-[#2F8F6B] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-[#2F8F6B]">
            <Brain size={48} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">AI 위험도 분석 중</h2>
        <p className="text-gray-500 text-lg">
          입력된 정보를 바탕으로<br/>안전 위험 요인을 정밀 분석하고 있습니다.
        </p>

        <motion.div
          className="mt-10 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-3 h-3 bg-[#2F8F6B] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-[#2F8F6B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-[#2F8F6B] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </motion.div>
      </div>
    </div>
  );
}
