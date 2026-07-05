package com.cognizant.orm_learn_2.repository;

import com.cognizant.orm_learn_2.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Integer> {

    // Facebook stocks between two dates
    List<Stock> findByCodeAndDateBetween(
            String code,
            LocalDate start,
            LocalDate end);

    // Google stock price > given value
    List<Stock> findByCodeAndCloseGreaterThan(
            String code,
            double close);

    // Top 3 by volume
    List<Stock> findTop3ByOrderByVolumeDesc();

    // Lowest Netflix stocks
    List<Stock> findTop3ByCodeOrderByCloseAsc(
            String code);
}