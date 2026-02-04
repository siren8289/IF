import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { AlertCircle, CheckCircle2, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
  matchedJob?: {
    jobName: string;
    location: string;
    workTime: string;
    description: string;
    matchedAt: string;
  };
}

export function HistoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const found = assessments.find((a: Assessment) => a.id === id);

    if (found) {
      setAssessment(found);
    } else {
      toast.error('평가 기록을 찾을 수 없습니다.');
      navigate('/history');
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    const filtered = assessments.filter((a: Assessment) => a.id !== id);
    localStorage.setItem('assessments', JSON.stringify(filtered));
    toast.success('평가 기록이 삭제되었습니다.');
    navigate('/history');
  };

  if (!assessment) return null;

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { text: '고위험', color: 'text-destructive', bg: 'bg-destructive' };
    if (score >= 40) return { text: '중위험', color: 'text-orange-600', bg: 'bg-orange-500' };
    return { text: '저위험', color: 'text-secondary', bg: 'bg-secondary' };
  };

  const riskLevel = getRiskLevel(assessment.riskScore);

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

  const getPhysicalLevelName = (level: string) => {
    const levels: Record<string, string> = {
      high: '높음',
      medium: '보통',
      low: '낮음',
    };
    return levels[level] || level;
  };

  const getWorkIntensityName = (intensity: string) => {
    const intensities: Record<string, string> = {
      low: '저강도',
      medium: '중강도',
      high: '고강도',
    };
    return intensities[intensity] || intensity;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              삭제
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">평가 기록 상세</h1>
          <p className="text-muted-foreground">
            {assessment ? `신청자: ${assessment.name}` : ''}
          </p>
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
          </CardContent>
        </Card>

        {assessment.matchedJob && (
          <Card className="mb-6 border-primary/50 bg-primary/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                매칭 완료된 일자리
              </CardTitle>
              <CardDescription>
                매칭 일시: {new Date(assessment.matchedJob.matchedAt).toLocaleString('ko-KR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">일자리명</p>
                  <p className="font-bold text-lg">{assessment.matchedJob.jobName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">근무 장소</p>
                  <p className="font-medium">{assessment.matchedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">근무 시간</p>
                  <p className="font-medium">{assessment.matchedJob.workTime}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">업무 내용 및 전달사항</p>
                  <p className="font-medium whitespace-pre-wrap">{assessment.matchedJob.description || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
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
                <p className="text-sm text-muted-foreground">신체 기능 수준</p>
                <p className="font-medium">{getPhysicalLevelName(assessment.physicalLevel)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">주요 질환</p>
                <p className="font-medium">{assessment.hasChronicDisease ? '있음' : '없음'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">근무 시간</p>
                <p className="font-medium">{assessment.workHours}시간/일</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">근무 강도</p>
                <p className="font-medium">{getWorkIntensityName(assessment.workIntensity)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
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
      </main>
    </div>
  );
}
