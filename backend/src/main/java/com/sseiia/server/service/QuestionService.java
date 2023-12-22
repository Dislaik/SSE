package com.sseiia.server.service;

import com.sseiia.server.entity.Question;
import com.sseiia.server.entity.Role;
import com.sseiia.server.repository.QuestionRespository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRespository questionRespository;

    public List<Question> getAll() {
        return questionRespository.findAll();
    }

    public Optional<Question> getById(Integer id) {
        return questionRespository.findById(id);
    }

    public Question save(Question question) {
        return questionRespository.save(question);
    }

    public void delete(Question question) {
        questionRespository.delete(question);
    }
}
