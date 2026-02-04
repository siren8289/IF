import React, { useState } from 'react';
import { Page, Assessment } from '@/shared/types/appTypes';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AssessmentFormProps {
  onNavigate: (page: Page) => void;
  onUpdateAssessment: (data: Partial<Assessment>) => void;
  initialData?: Partial<Assessment>;
}

export function AssessmentForm({ onNavigate, onUpdateAssessment, initialData }: AssessmentFormProps) {
  const [formData, setFormData] = useState({
    applicantName: initialData?.applicantName || '',
    age: initialData?.age?.toString() || '',
    healthStatus: initialData?.healthStatus || 'average',
    workConditions: initialData?.workConditions || [] as string[],
    notes: initialData?.notes || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const workOptions = ['실내 근무', '야외 근무', '오전', '오후', '단순 노무', '전문직', '앉아서 근무', '서서 근무'];

  const toggleCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      workConditions: prev.workConditions.includes(condition)
        ? prev.workConditions.filter(c => c !== condition)
        : [...prev.workConditions, condition]
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.applicantName) newErrors.applicantName = '이름을 입력해주세요';
    if (!formData.age || isNaN(Number(formData.age))) newErrors.age = '유효한 연령을 입력해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onUpdateAssessment({
        applicantName: formData.applicantName,
        age: Number(formData.age),
        healthStatus: formData.healthStatus,
        workConditions: formData.workConditions,
        notes: formData.notes
      });
      onNavigate('risk-analysis');
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-10 text-center">
          <h2 className="text-xl font-medium text-slate-600">
            정확한 판단을 위해 신청자의 기본 정보를 입력해주세요.
          </h2>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-10">

          {/* Name & Age Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">이름</label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                className={`w-full px-5 py-4 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F8F6B] focus:border-transparent transition-all text-gray-800 placeholder-gray-400 ${errors.applicantName ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="홍길동"
              />
              {errors.applicantName && <p className="text-red-500 text-xs mt-2 ml-1">{errors.applicantName}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">연령</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-5 py-4 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F8F6B] focus:border-transparent transition-all text-gray-800 placeholder-gray-400 ${errors.age ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="65"
              />
              {errors.age && <p className="text-red-500 text-xs mt-2 ml-1">{errors.age}</p>}
            </div>
          </div>

          {/* Health Status */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">건강 상태</label>
            <div className="grid grid-cols-3 gap-4">
              {['good', 'average', 'bad'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFormData({ ...formData, healthStatus: status })}
                  className={`py-4 rounded-xl border font-bold transition-all ${
                    formData.healthStatus === status
                      ? 'bg-[#E5F2ED] border-[#2F8F6B] text-[#2F8F6B] shadow-sm'
                      : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  {status === 'good' ? '좋음' : status === 'average' ? '보통' : '나쁨'}
                </button>
              ))}
            </div>
          </div>

          {/* Work Conditions */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">근무 가능 조건 (다중 선택)</label>
            <div className="flex flex-wrap gap-3">
              {workOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleCondition(option)}
                  className={`px-6 py-3 rounded-full text-sm font-medium border transition-all ${
                    formData.workConditions.includes(option)
                      ? 'bg-[#2F8F6B] border-[#2F8F6B] text-white shadow-md shadow-[#2F8F6B]/20'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">참고 사항</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F8F6B] focus:border-transparent transition-all h-40 resize-none text-gray-800 placeholder-gray-400"
              placeholder="특이사항을 입력하세요..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#2F8F6B] hover:bg-[#257A5A] text-white font-bold py-5 rounded-xl shadow-lg shadow-[#2F8F6B]/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] text-lg"
            >
              <span>위험도 분석 시작</span>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
