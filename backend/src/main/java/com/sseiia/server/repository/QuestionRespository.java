package com.sseiia.server.repository;

import com.sseiia.server.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRespository extends JpaRepository<Question, Integer> {

}
