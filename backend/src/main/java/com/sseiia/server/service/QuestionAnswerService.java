package com.sseiia.server.service;

import com.sseiia.server.entity.Question;
import com.sseiia.server.entity.QuestionAnswer;
import com.sseiia.server.repository.QuestionAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionAnswerService {
    @Autowired
    QuestionAnswerRepository questionAnswerRepository;

    public List<QuestionAnswer> getAll() {
        return questionAnswerRepository.findAll();
    }

    public Optional<QuestionAnswer> getById(Integer id) {
        return questionAnswerRepository.findById(id);
    }

    public QuestionAnswer save(QuestionAnswer questionAnswer) {
        return questionAnswerRepository.save(questionAnswer);
    }

    public void delete(QuestionAnswer questionAnswer) {
        questionAnswerRepository.delete(questionAnswer);
    }
}
