package com.example.demo.repository.human;

import com.example.demo.domain.human.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
}

