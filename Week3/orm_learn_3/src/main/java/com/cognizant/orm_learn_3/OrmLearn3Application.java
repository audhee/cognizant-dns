package com.cognizant.orm_learn_3;

import com.cognizant.orm_learn_3.model.Employee;
import com.cognizant.orm_learn_3.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class OrmLearn3Application {

	@Autowired
	private EmployeeService employeeService;

	public static void main(String[] args) {
		SpringApplication.run(OrmLearn3Application.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {

			testGetAllPermanentEmployees();

			testGetAverageSalary();

			testGetAllEmployeesNative();

		};
	}

	private void testGetAllPermanentEmployees() {

		System.out.println("===== Permanent Employees =====");

		List<Employee> employees =
				employeeService.getAllPermanentEmployees();

		employees.forEach(employee -> {

			System.out.println(employee);

			System.out.println(employee.getDepartment());

			System.out.println(employee.getSkillList());

			System.out.println("--------------------------------");

		});

	}

	private void testGetAverageSalary() {

		System.out.println();

		System.out.println("===== Average Salary =====");

		double avg = employeeService.getAverageSalary(3);

		System.out.println(avg);

	}

	private void testGetAllEmployeesNative() {

		System.out.println();

		System.out.println("===== Native Query =====");

		employeeService.getAllEmployeesNative()
				.forEach(System.out::println);

	}

}