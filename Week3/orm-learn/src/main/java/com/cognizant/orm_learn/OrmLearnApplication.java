package com.cognizant.orm_learn;

import com.cognizant.orm_learn.exception.CountryNotFoundException;
import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.service.CountryService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class OrmLearnApplication {

	private static CountryService service;

	public static void main(String[] args) {

		ApplicationContext context =
				SpringApplication.run(OrmLearnApplication.class, args);

		service = context.getBean(CountryService.class);

		// Hands-on 1
		getAllCountries();

		// Hands-on 6
		findCountry();

		// Hands-on 7
		testAddCountry();

		// Hands-on 8
		testUpdateCountry();

		// Hands-on 9
		testDeleteCountry();

	}

	// Hands-on 1
	private static void getAllCountries() {

		System.out.println("===== GET ALL COUNTRIES =====");
		System.out.println(service.getAllCountries());
	}

	// Hands-on 6
	private static void findCountry() {

		System.out.println("===== FIND COUNTRY =====");

		try {
			Country country = service.findCountryByCode("IN");
			System.out.println(country);
		} catch (CountryNotFoundException e) {
			System.out.println(e.getMessage());
		}
	}

	// Hands-on 7
	private static void testAddCountry() {

		System.out.println("===== ADD COUNTRY =====");

		Country country = new Country("JP", "Japan");

		service.addCountry(country);

		try {
			System.out.println(service.findCountryByCode("JP"));
		} catch (CountryNotFoundException e) {
			System.out.println(e.getMessage());
		}
	}

	// Hands-on 8
	private static void testUpdateCountry() {

		System.out.println("===== UPDATE COUNTRY =====");

		try {

			service.updateCountry("IN", "Bharat");

			System.out.println(service.findCountryByCode("IN"));

		} catch (CountryNotFoundException e) {

			System.out.println(e.getMessage());

		}

	}

	// Hands-on 9
	private static void testDeleteCountry() {

		System.out.println("===== DELETE COUNTRY =====");

		service.deleteCountry("JP");

		System.out.println("Country Deleted Successfully");

	}

}