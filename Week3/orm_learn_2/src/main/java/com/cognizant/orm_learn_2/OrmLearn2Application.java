package com.cognizant.orm_learn_2;

import com.cognizant.orm_learn_2.repository.CountryRepository;
import com.cognizant.orm_learn_2.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class OrmLearn2Application {

	@Autowired
	private CountryRepository countryRepository;

	@Autowired
	private StockRepository stockRepository;

	public static void main(String[] args) {
		SpringApplication.run(OrmLearn2Application.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			testCountryQueries();
		};
	}
	private void testStockQueries() {

		System.out.println("\nFacebook September");

		stockRepository.findByCodeAndDateBetween(
						"FB",
						LocalDate.of(2019,9,1),
						LocalDate.of(2019,9,30))
				.forEach(System.out::println);

		System.out.println("\nGoogle >1250");

		stockRepository.findByCodeAndCloseGreaterThan(
						"GOOGL",
						1250)
				.forEach(System.out::println);

		System.out.println("\nTop 3 Volume");

		stockRepository.findTop3ByOrderByVolumeDesc()
				.forEach(System.out::println);

		System.out.println("\nNetflix Lowest");

		stockRepository.findTop3ByCodeOrderByCloseAsc("NFLX")
				.forEach(System.out::println);
	}

	private void testCountryQueries() {

		System.out.println("Containing 'ou'");
		countryRepository.findByNameContaining("ou")
				.forEach(System.out::println);

		System.out.println("--------------------------------");

		System.out.println("Containing 'ou' Ordered");
		countryRepository.findByNameContainingOrderByNameAsc("ou")
				.forEach(System.out::println);

		System.out.println("--------------------------------");

		System.out.println("Starts With Z");
		countryRepository.findByNameStartingWith("Z")
				.forEach(System.out::println);
	}
}