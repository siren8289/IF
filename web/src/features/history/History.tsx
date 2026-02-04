import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Search, Filter } from 'lucide-react';

interface Assessment {
  id: string;
  name: string;
  age: string;
  job: string;
  riskScore: number;
  createdAt: string;
  matchedJob?: {
    jobName: string;
  };
}

export function History() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  const assessments: Assessment[] = JSON.parse(localStorage.getItem('assessments') || '[]');

  const filteredAssessments = useMemo(() => {
    return assessments.filter((assessment) => {
      // Search filter
      const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Job filter
      const matchesJob = jobFilter === 'all' || assessment.job === jobFilter;

      // Period filter
      let matchesPeriod = true;
      if (periodFilter !== 'all') {
        const assessmentDate = new Date(assessment.createdAt);
        const now = new Date();

        if (periodFilter === 'today') {
          matchesPeriod = assessmentDate.toDateString() === now.toDateString();
        } else if (periodFilter === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesPeriod = assessmentDate >= weekAgo;
        } else if (periodFilter === 'month') {
          matchesPeriod = assessmentDate.getMonth() === now.getMonth() &&
                         assessmentDate.getFullYear() === now.getFullYear();
        }
      }

      return matchesSearch && matchesJob && matchesPeriod;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [assessments, searchTerm, jobFilter, periodFilter]);

  const getRiskBadge = (score: number) => {
    if (score >= 70) return <Badge variant="destructive">고위험</Badge>;
    if (score >= 40) return <Badge className="bg-orange-500 hover:bg-orange-600">중위험</Badge>;
    return <Badge variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">저위험</Badge>;
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

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">판단 기록 조회</h1>
          <p className="text-muted-foreground">과거 평가 기록을 확인하세요</p>
        </div>

        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">필터 및 검색</CardTitle>
            <CardDescription>조건을 선택하여 기록을 필터링할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="신청자 이름 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-input-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger className="bg-input-background">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="직무 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 직무</SelectItem>
                    <SelectItem value="office">사무직</SelectItem>
                    <SelectItem value="service">서비스직</SelectItem>
                    <SelectItem value="production">생산직</SelectItem>
                    <SelectItem value="sales">판매직</SelectItem>
                    <SelectItem value="technical">기술직</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="bg-input-background">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 기간</SelectItem>
                    <SelectItem value="today">오늘</SelectItem>
                    <SelectItem value="week">최근 7일</SelectItem>
                    <SelectItem value="month">이번 달</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>평가 기록 ({filteredAssessments.length}건)</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAssessments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>신청자</TableHead>
                      <TableHead>연령</TableHead>
                      <TableHead>직무</TableHead>
                      <TableHead>매칭 일자리</TableHead>
                      <TableHead>위험도</TableHead>
                      <TableHead>평가 등급</TableHead>
                      <TableHead>평가 일시</TableHead>
                      <TableHead>상세</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments.map((assessment) => (
                      <TableRow key={assessment.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{assessment.name}</TableCell>
                        <TableCell>{assessment.age}세</TableCell>
                        <TableCell>{getJobName(assessment.job)}</TableCell>
                        <TableCell>
                          {assessment.matchedJob ? (
                            <Badge variant="outline" className="border-primary text-primary">
                              {assessment.matchedJob.jobName}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </TableCell>
                        <TableCell>{assessment.riskScore}%</TableCell>
                        <TableCell>{getRiskBadge(assessment.riskScore)}</TableCell>
                        <TableCell>
                          {new Date(assessment.createdAt).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/history/${assessment.id}`)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            보기
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">조회된 평가 기록이 없습니다.</p>
                <Button onClick={() => navigate('/assessment/new')} variant="outline">
                  새 평가 시작하기
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
