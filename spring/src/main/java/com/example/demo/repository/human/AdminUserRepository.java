package com.example.demo.repository.human;

import com.example.demo.domain.human.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
}

