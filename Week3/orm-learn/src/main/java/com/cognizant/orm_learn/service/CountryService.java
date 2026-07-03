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
    CountryRepository repository;

    @Transactional(readOnly = true)
    public List<Country> getAllCountries(){
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Country findCountryByCode(String code)
            throws CountryNotFoundException{

        return repository.findById(code)
                .orElseThrow(() ->
                        new CountryNotFoundException("Country Not Found"));
    }

    @Transactional
    public Country addCountry(Country country){
        return repository.save(country);
    }

    @Transactional
    public Country updateCountry(Country country){
        return repository.save(country);
    }

    @Transactional
    public void deleteCountry(String code){
        repository.deleteById(code);
    }

    @Transactional(readOnly = true)
    public List<Country> searchCountry(String name){
        return repository.findByNameContainingIgnoreCase(name);
    }

}