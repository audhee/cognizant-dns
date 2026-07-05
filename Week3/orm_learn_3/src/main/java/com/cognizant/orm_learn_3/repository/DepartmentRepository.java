package com.cognizant.orm_learn_3.repository;

import com.cognizant.orm_learn_3.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department,Integer> {
}