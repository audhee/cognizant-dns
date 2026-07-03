package com.cognizant.orm_learn;

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

		getAllCountries();

		findCountry();

		addCountry();

		updateCountry();

		deleteCountry();

		searchCountry();

	}

	static void getAllCountries() {

		System.out.println(service.getAllCountries());

	}

	static void findCountry(){

		try{
			System.out.println(service.findCountryByCode("IN"));
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}

	}

	static void addCountry(){

		service.addCountry(new Country("JP","Japan"));

	}

	static void updateCountry(){

		service.updateCountry(new Country("IN","India"));

	}

	static void deleteCountry(){

		service.deleteCountry("JP");

	}

	static void searchCountry(){

		System.out.println(service.searchCountry("Ind"));

	}

}