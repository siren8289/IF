package com.example.demo.repository.human;

import com.example.demo.domain.human.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}

