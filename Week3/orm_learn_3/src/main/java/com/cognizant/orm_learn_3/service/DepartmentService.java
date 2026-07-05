package com.cognizant.orm_learn_3.service;

import com.cognizant.orm_learn_3.model.Department;
import com.cognizant.orm_learn_3.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public Department get(int id){
        return departmentRepository.findById(id).orElse(null);
    }

    @Transactional
    public void save(Department department){
        departmentRepository.save(department);
    }
}