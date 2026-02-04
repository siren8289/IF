import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Progress } from '@/app/components/ui/progress';
import { ArrowLeft, ArrowRight, BrainCircuit } from 'lucide-react';

export function AssessmentNew() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    job: '',
    physicalLevel: '',
    hasChronicDisease: false,
    workHours: '',
    workIntensity: '',
  });

  const calculateRisk = () => {
    let riskScore = 0;
    const factors = [];

    // 연령 평가 (20점)
    const age = parseInt(formData.age);
    if (age < 20) {
      riskScore += 15;
      factors.push({ factor: '미성년자', score: 15 });
    } else if (age >= 60) {
      riskScore += 10;
      factors.push({ factor: '고령', score: 10 });
    } else if (age >= 50) {
      riskScore += 5;
      factors.push({ factor: '준고령', score: 5 });
    }

    // 신체 기능 수준 (30점)
    switch (formData.physicalLevel) {
      case 'low':
        riskScore += 30;
        factors.push({ factor: '낮은 신체 기능', score: 30 });
        break;
      case 'medium':
        riskScore += 15;
        factors.push({ factor: '중간 신체 기능', score: 15 });
        break;
      case 'high':
        riskScore += 5;
        factors.push({ factor: '높은 신체 기능', score: 5 });
        break;
    }

    // 주요 질환 (15점)
    if (formData.hasChronicDisease) {
      riskScore += 15;
      factors.push({ factor: '만성질환 보유', score: 15 });
    }

    // 근무 시간 (15점)
    const workHours = parseInt(formData.workHours);
    if (workHours >= 10) {
      riskScore += 15;
      factors.push({ factor: '장시간 근무', score: 15 });
    } else if (workHours >= 8) {
      riskScore += 8;
      factors.push({ factor: '표준 근무시간 이상', score: 8 });
    }

    // 근무 강도 (20점)
    switch (formData.workIntensity) {
      case 'high':
        riskScore += 20;
        factors.push({ factor: '고강도 작업', score: 20 });
        break;
      case 'medium':
        riskScore += 10;
        factors.push({ factor: '중강도 작업', score: 10 });
        break;
      case 'low':
        riskScore += 3;
        factors.push({ factor: '저강도 작업', score: 3 });
        break;
    }

    return { riskScore: Math.min(riskScore, 100), factors };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation: 0% -> 100% in ~2.5s
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        finalizeSubmission();
      }
    }, 100);
  };

  const finalizeSubmission = () => {
    const { riskScore, factors } = calculateRisk();

    const assessment = {
      id: Date.now().toString(),
      ...formData,
      riskScore,
      factors,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    assessments.push(assessment);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    localStorage.setItem('currentAssessment', JSON.stringify(assessment));

    navigate('/assessment/result');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">새 위험도 판단</h1>
          <p className="text-muted-foreground">신청자 정보를 입력하세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>신청자 정보 입력</CardTitle>
            <CardDescription>
              정확한 위험도 산출을 위해 모든 항목을 성실히 작성해 주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">신청자 이름 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="이름을 입력하세요"
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">연령 *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  min="15"
                  max="100"
                  placeholder="나이를 입력하세요"
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job">신청 직무 *</Label>
                <Select value={formData.job} onValueChange={(value) => setFormData({ ...formData, job: value })} required>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="직무를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">사무직</SelectItem>
                    <SelectItem value="service">서비스직</SelectItem>
                    <SelectItem value="production">생산직</SelectItem>
                    <SelectItem value="sales">판매직</SelectItem>
                    <SelectItem value="technical">기술직</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="physicalLevel">신체 기능 수준 *</Label>
                <Select value={formData.physicalLevel} onValueChange={(value) => setFormData({ ...formData, physicalLevel: value })} required>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="신체 기능 수준을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">높음 (일상생활 및 작업 수행에 제약 없음)</SelectItem>
                    <SelectItem value="medium">보통 (일부 보조 장비 필요)</SelectItem>
                    <SelectItem value="low">낮음 (상당한 보조 필요)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasChronicDisease"
                  checked={formData.hasChronicDisease}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasChronicDisease: checked as boolean })}
                />
                <Label htmlFor="hasChronicDisease" className="cursor-pointer">
                  주요 질환 보유 (당뇨, 고혈압, 심장질환 등)
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workHours">근무 시간 (시간/일) *</Label>
                <Input
                  id="workHours"
                  type="number"
                  value={formData.workHours}
                  onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                  required
                  min="1"
                  max="24"
                  placeholder="하루 근무 시간을 입력하세요"
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workIntensity">근무 강도 *</Label>
                <Select value={formData.workIntensity} onValueChange={(value) => setFormData({ ...formData, workIntensity: value })} required>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="근무 강도를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">저강도 (주로 앉아서 작업)</SelectItem>
                    <SelectItem value="medium">중강도 (서서 작업 또는 간헐적 이동)</SelectItem>
                    <SelectItem value="high">고강도 (무거운 물건 취급, 장시간 이동)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/')} className="flex-1">
                  취소
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? '산출 중...' : '위험도 산출'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isSubmitting} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-primary animate-pulse" />
              AI 위험도 분석 중
            </DialogTitle>
            <DialogDescription>
              입력된 정보를 바탕으로 위험도를 산출하고 있습니다. 잠시만 기다려주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">{progress}% 완료</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
