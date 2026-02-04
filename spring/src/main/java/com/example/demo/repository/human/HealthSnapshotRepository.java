package com.example.demo.repository.human;

import com.example.demo.domain.human.HealthSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthSnapshotRepository extends JpaRepository<HealthSnapshot, Long> {
}

