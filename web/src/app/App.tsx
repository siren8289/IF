"use client";
import React, { useState } from 'react';
import { Layout } from '@/shared/layout/Layout';
import { Login } from '@/features/auth/Login';
import { Signup } from '@/features/auth/Signup';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { AssessmentForm } from '@/features/assessment/AssessmentForm';
import { RiskAnalysis } from '@/features/risk/RiskAnalysis';
import { RiskResult } from '@/features/risk/RiskResult';
import { AppTransfer } from '@/features/transfer/AppTransfer';
import { JobMatching } from '@/features/jobs/JobMatching';
import { Page, Assessment } from '@/shared/types/appTypes';
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentAssessment, setCurrentAssessment] = useState<Partial<Assessment>>({});

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleUpdateAssessment = (data: Partial<Assessment>) => {
    setCurrentAssessment(prev => ({ ...prev, ...data }));
  };

  const handleSelectAssessment = (assessment: Assessment | null, navigate: boolean = true) => {
    if (assessment) {
      setCurrentAssessment(assessment);
      if (navigate) {
        handleNavigate('risk-result'); 
      }
    } else {
      // New assessment
      setCurrentAssessment({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'Draft',
        jobMatches: []
      });
      handleNavigate('assessment-form');
    }
  };

  const handleSaveAssessment = (targetStatus?: string) => {
    const saved = localStorage.getItem('if_assessments');
    const assessments: Assessment[] = saved ? JSON.parse(saved) : [];
    
    // Check if updating existing or adding new
    const existingIndex = assessments.findIndex(a => a.id === currentAssessment.id);
    
    // Determine status: Use provided targetStatus, or keep current status, or default to 'Analyzed' if Draft
    let newStatus = targetStatus;
    if (!newStatus) {
       newStatus = currentAssessment.status === 'Draft' ? 'Analyzed' : (currentAssessment.status || 'Analyzed');
    }

    const finalAssessment = {
      ...currentAssessment,
      status: newStatus
    } as Assessment;

    if (existingIndex >= 0) {
      assessments[existingIndex] = finalAssessment;
    } else {
      assessments.push(finalAssessment);
    }
    
    localStorage.setItem('if_assessments', JSON.stringify(assessments));
    
    // Update local state as well to reflect saved status
    setCurrentAssessment(finalAssessment);
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === 'login' && <Login onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <Signup onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && (
        <Dashboard 
          onNavigate={handleNavigate} 
          onSelectAssessment={handleSelectAssessment} 
        />
      )}
      {currentPage === 'assessment-form' && (
        <AssessmentForm 
          onNavigate={handleNavigate} 
          onUpdateAssessment={handleUpdateAssessment}
          initialData={currentAssessment}
        />
      )}
      {currentPage === 'risk-analysis' && (
        <RiskAnalysis 
          onNavigate={handleNavigate} 
          currentAssessment={currentAssessment}
          onUpdateAssessment={handleUpdateAssessment}
        />
      )}
      {currentPage === 'risk-result' && (
        <RiskResult 
          onNavigate={handleNavigate} 
          assessment={currentAssessment}
          onSave={handleSaveAssessment}
        />
      )}
      {currentPage === 'job-matching' && (
        <JobMatching 
          onNavigate={handleNavigate} 
          assessment={currentAssessment}
          onUpdateAssessment={handleUpdateAssessment}
        />
      )}
      {currentPage === 'app-transfer' && (
        <AppTransfer 
          onNavigate={handleNavigate} 
          assessment={currentAssessment}
          onSave={() => handleSaveAssessment('Completed')}
        />
      )}
    </Layout>
  );
}
