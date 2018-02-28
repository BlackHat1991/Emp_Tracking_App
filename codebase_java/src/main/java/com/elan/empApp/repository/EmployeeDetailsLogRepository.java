package com.elan.empApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elan.empApp.model.EmployeeDetailsLog;

public interface EmployeeDetailsLogRepository extends JpaRepository<EmployeeDetailsLog, Long> {

}
