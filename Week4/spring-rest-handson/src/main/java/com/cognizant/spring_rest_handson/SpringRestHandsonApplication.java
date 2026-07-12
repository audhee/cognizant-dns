package com.cognizant.spring_rest_handson;

import com.cognizant.spring_rest_handson.service.CountryService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringRestHandsonApplication {

	public static void main(String[] args) {

		var context = SpringApplication.run(SpringRestHandsonApplication.class, args);

		CountryService service = context.getBean(CountryService.class);

		System.out.println(service.getCountry());
	}

}