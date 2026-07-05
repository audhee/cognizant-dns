package com.cognizant.orm_learn_3.repository;

import com.cognizant.orm_learn_3.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;



public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    // Hands-on 2
    @Query("SELECT DISTINCT e FROM Employee e " +
            "LEFT JOIN FETCH e.department " +
            "LEFT JOIN FETCH e.skillList " +
            "WHERE e.permanent = true")
    List<Employee> getAllPermanentEmployees();

    // Hands-on 4
    @Query("SELECT AVG(e.salary) FROM Employee e WHERE e.department.id = :id")
    double getAverageSalary(@Param("id") int id);

    // Hands-on 5

    @Query(value = "SELECT * FROM employee", nativeQuery = true)
    List<Employee> getAllEmployeesNative();
}