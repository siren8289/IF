import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export function About() {
  const navigate = useNavigate();

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

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">시스템 안내</h1>
          <p className="text-muted-foreground">위험도 판단 기준 및 사용 방법</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle>장애인 취업 위험도 판단 시스템</CardTitle>
            <CardDescription>
              장애인 근로자의 안전한 취업을 위한 과학적 위험도 평가 시스템입니다.
              개인의 신체적 특성과 작업 환경을 종합적으로 분석하여 적합한 직무 배치를 지원합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">시스템 목적</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>장애인 근로자의 작업 적합성 사전 평가</li>
                <li>작업 환경의 잠재적 위험 요인 식별</li>
                <li>안전한 근무 환경 조성을 위한 의사결정 지원</li>
                <li>근로자 보호 및 산업재해 예방</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>위험도 평가 기준</CardTitle>
            <CardDescription>
              다음 5가지 주요 요인을 기반으로 종합적인 위험도를 산출합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-accent border-l-4 border-primary">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                  연령 (최대 20점)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• 미성년자 (20세 미만): 15점</li>
                  <li>• 고령자 (60세 이상): 10점</li>
                  <li>• 준고령자 (50-59세): 5점</li>
                  <li>• 기타: 0점</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-accent border-l-4 border-primary">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                  신체 기능 수준 (최대 30점)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• 낮음 (상당한 보조 필요): 30점</li>
                  <li>• 보통 (일부 보조 장비 필요): 15점</li>
                  <li>• 높음 (제약 없음): 5점</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-accent border-l-4 border-primary">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                  만성질환 보유 여부 (최대 15점)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• 주요 질환 보유: 15점</li>
                  <li>• 질환 없음: 0점</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-accent border-l-4 border-primary">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">4</span>
                  근무 시간 (최대 15점)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• 10시간 이상: 15점</li>
                  <li>• 8-10시간: 8점</li>
                  <li>• 8시간 미만: 0점</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-accent border-l-4 border-primary">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">5</span>
                  근무 강도 (최대 20점)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-10">
                  <li>• 고강도 (무거운 물건, 장시간 이동): 20점</li>
                  <li>• 중강도 (서서 작업, 간헐적 이동): 10점</li>
                  <li>• 저강도 (주로 앉아서 작업): 3점</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>위험도 등급 분류</CardTitle>
            <CardDescription>
              총점에 따라 3단계로 위험도를 분류합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-6 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle2 className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-green-800 mb-1">저위험 (0-39점)</h4>
                <p className="text-sm text-green-700">
                  일반적인 안전 수칙 준수로 안전한 근무가 가능합니다.
                  정기적인 건강 검진과 기본적인 작업 안전 교육을 권장합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-6 rounded-lg bg-orange-50 border border-orange-300">
              <AlertTriangle className="w-6 h-6 text-orange-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-orange-800 mb-1">중위험 (40-69점)</h4>
                <p className="text-sm text-orange-700">
                  적절한 보호 조치와 정기적인 모니터링이 필요합니다.
                  작업 환경 개선 및 보조 장비 지원을 고려해야 하며, 주기적인 재평가가 권장됩니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-6 rounded-lg bg-red-50 border border-red-300">
              <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-red-800 mb-1">고위험 (70-100점)</h4>
                <p className="text-sm text-red-700">
                  해당 직무는 신청자에게 적합하지 않을 수 있습니다.
                  추가적인 안전 장비 및 보조 인력 배치가 필수적이며, 대안 직무 재배치를 적극 검토해야 합니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              유의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>본 시스템은 참고 자료로만 활용되어야 하며, 최종 결정은 전문가의 종합적인 판단이 필요합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>개인의 특수한 상황과 직무의 세부 조건에 따라 실제 위험도는 달라질 수 있습니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>정기적인 재평가를 통해 근로자의 상태 변화를 모니터링하는 것이 중요합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>평가 결과는 근로자의 능력을 제한하기 위함이 아닌, 안전한 근무 환경을 조성하기 위한 것입니다.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
