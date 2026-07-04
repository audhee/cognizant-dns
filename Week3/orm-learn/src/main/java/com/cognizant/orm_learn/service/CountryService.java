package com.cognizant.orm_learn.service;

import com.cognizant.orm_learn.exception.CountryNotFoundException;
import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository repository;

    // Get all countries
    @Transactional(readOnly = true)
    public List<Country> getAllCountries() {
        return repository.findAll();
    }

    // Find country by code
    @Transactional(readOnly = true)
    public Country findCountryByCode(String code)
            throws CountryNotFoundException {

        return repository.findById(code)
                .orElseThrow(() ->
                        new CountryNotFoundException("Country Not Found"));
    }

    // Add country
    @Transactional
    public void addCountry(Country country) {
        repository.save(country);
    }

    // Update country
    @Transactional
    public void updateCountry(String code, String name)
            throws CountryNotFoundException {

        Country country = findCountryByCode(code);

        country.setName(name);

        repository.save(country);
    }

    // Delete country
    @Transactional
    public void deleteCountry(String code) {
        repository.deleteById(code);
    }

    // Search by partial name
    @Transactional(readOnly = true)
    public List<Country> searchCountry(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

}