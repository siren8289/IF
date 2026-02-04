import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { AlertCircle, CheckCircle2, Home, ArrowRight, ArrowLeft } from 'lucide-react';

interface Assessment {
  id: string;
  name: string;
  age: string;
  job: string;
  physicalLevel: string;
  hasChronicDisease: boolean;
  workHours: string;
  workIntensity: string;
  riskScore: number;
  factors: { factor: string; score: number }[];
  createdAt: string;
}

export function AssessmentResult() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('currentAssessment');
    if (data) {
      setAssessment(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!assessment) return null;

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { text: '고위험', color: 'text-destructive', bg: 'bg-destructive' };
    if (score >= 40) return { text: '중위험', color: 'text-orange-600', bg: 'bg-orange-500' };
    return { text: '저위험', color: 'text-secondary', bg: 'bg-secondary' };
  };

  const riskLevel = getRiskLevel(assessment.riskScore);

  const handleProceed = () => {
    navigate('/assessment/matching');
  };

  const getJobName = (job: string) => {
    const jobs: Record<string, string> = {
      office: '사무직',
      service: '서비스직',
      production: '생산직',
      sales: '판매직',
      technical: '기술직',
    };
    return jobs[job] || job;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">위험도 평가 결과</h1>
          <p className="text-muted-foreground">신청자의 종합 위험도 분석 보고서입니다</p>
        </div>

        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {assessment.riskScore < 40 ? (
                <CheckCircle2 className={`w-6 h-6 ${riskLevel.color}`} />
              ) : (
                <AlertCircle className={`w-6 h-6 ${riskLevel.color}`} />
              )}
              총 위험도
            </CardTitle>
            <CardDescription>
              평가 일시: {new Date(assessment.createdAt).toLocaleString('ko-KR')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${riskLevel.color}`}>
                {assessment.riskScore}%
              </div>
              <div className={`inline-block px-4 py-2 rounded-full ${riskLevel.bg} bg-opacity-10 ${riskLevel.color} font-semibold`}>
                {riskLevel.text}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>위험도 수준</span>
                <span className="font-medium">{assessment.riskScore}점 / 100점</span>
              </div>
              <Progress value={assessment.riskScore} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>안전</span>
                <span>주의</span>
                <span>위험</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">종합 평가</h4>
              <p className="text-sm text-muted-foreground">
                {assessment.riskScore >= 70 &&
                  '고위험군으로 분류되었습니다. 해당 직무는 신청자에게 적합하지 않을 수 있으며, 추가적인 안전 장비 및 보조 인력 배치가 필요합니다.'}
                {assessment.riskScore >= 40 && assessment.riskScore < 70 &&
                  '중위험군으로 분류되었습니다. 적절한 보호 조치와 정기적인 모니터링이 필요합니다.'}
                {assessment.riskScore < 40 &&
                  '저위험군으로 분류되었습니다. 일반적인 안전 수칙 준수로 안전한 근무가 가능합니다.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>주요 위험 요인</CardTitle>
            <CardDescription>
              위험도 산출에 영향을 준 요인들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assessment.factors.length > 0 ? (
              <div className="space-y-3">
                {assessment.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                    <span className="font-medium">{factor.factor}</span>
                    <span className="text-sm font-semibold text-destructive">+{factor.score}점</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">위험 요인이 발견되지 않았습니다.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>신청자 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">이름</p>
                <p className="font-medium">{assessment.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">연령</p>
                <p className="font-medium">{assessment.age}세</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">신청 직무</p>
                <p className="font-medium">{getJobName(assessment.job)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">근무 시간</p>
                <p className="font-medium">{assessment.workHours}시간/일</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">주요 질환</p>
                <p className="font-medium">{assessment.hasChronicDisease ? '있음' : '없음'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
            <Home className="w-4 h-4 mr-2" />
            대시보드로
          </Button>
          <Button onClick={handleProceed} className="flex-1 bg-primary hover:bg-primary/90">
            담당자 판단 및 매칭
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
