package com.cognizant.orm_learn_3.service;

import com.cognizant.orm_learn_3.model.Skill;
import com.cognizant.orm_learn_3.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Transactional(readOnly = true)
    public Skill get(int id){
        return skillRepository.findById(id).orElse(null);
    }

    @Transactional
    public void save(Skill skill){
        skillRepository.save(skill);
    }
}