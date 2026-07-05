package com.cognizant.orm_learn_3.service;

import com.cognizant.orm_learn_3.model.Employee;
import com.cognizant.orm_learn_3.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional(readOnly = true)
    public List<Employee> getAllPermanentEmployees() {
        return employeeRepository.getAllPermanentEmployees();
    }

    @Transactional(readOnly = true)
    public double getAverageSalary(int departmentId) {
        return employeeRepository.getAverageSalary(departmentId);
    }

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployeesNative() {
        return employeeRepository.getAllEmployeesNative();
    }

    @Transactional(readOnly = true)
    public Employee get(int id){
        return employeeRepository.findById(id).orElse(null);
    }

    @Transactional
    public void save(Employee employee){
        employeeRepository.save(employee);
    }
}