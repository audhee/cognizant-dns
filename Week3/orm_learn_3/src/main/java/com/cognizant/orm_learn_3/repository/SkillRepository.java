package com.cognizant.orm_learn_3.repository;

import com.cognizant.orm_learn_3.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill,Integer> {
}