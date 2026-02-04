package com.example.demo.domain.human;

import com.example.demo.domain.ai.AIRiskResult;
import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "assessment")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "applicant_id")
    private Applicant applicant;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "job_id")
    private Job job;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "health_id")
    private HealthSnapshot healthSnapshot;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ai_result_id")
    private AIRiskResult aiRiskResult;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "admin_id")
    private AdminUser adminUser;

    @Column(name = "assessed_at")
    private OffsetDateTime assessedAt;

    // getters/setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Applicant getApplicant() {
        return applicant;
    }

    public void setApplicant(Applicant applicant) {
        this.applicant = applicant;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public HealthSnapshot getHealthSnapshot() {
        return healthSnapshot;
    }

    public void setHealthSnapshot(HealthSnapshot healthSnapshot) {
        this.healthSnapshot = healthSnapshot;
    }

    public AIRiskResult getAiRiskResult() {
        return aiRiskResult;
    }

    public void setAiRiskResult(AIRiskResult aiRiskResult) {
        this.aiRiskResult = aiRiskResult;
    }

    public AdminUser getAdminUser() {
        return adminUser;
    }

    public void setAdminUser(AdminUser adminUser) {
        this.adminUser = adminUser;
    }

    public OffsetDateTime getAssessedAt() {
        return assessedAt;
    }

    public void setAssessedAt(OffsetDateTime assessedAt) {
        this.assessedAt = assessedAt;
    }
}

