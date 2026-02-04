package com.example.demo.repository.human;

import com.example.demo.domain.human.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
}

