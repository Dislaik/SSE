package com.sseiia.server.controller;

import com.sseiia.server.dto.CreateQuestion;
import com.sseiia.server.dto.UpdateQuestion;
import com.sseiia.server.dto.UpdateTicketStatus;
import com.sseiia.server.entity.*;
import com.sseiia.server.service.QuestionAnswerService;
import com.sseiia.server.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @Autowired
    QuestionAnswerService questionAnswerService;

    @GetMapping("")
    public ResponseEntity<List<Question>> getAll() {

        return new ResponseEntity(questionService.getAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Question> create(@Valid @RequestBody CreateQuestion createQuestion) {
        try {
            QuestionAnswer questionAnswer = new QuestionAnswer(createQuestion.getAnswer());

            questionAnswerService.save(questionAnswer);

            Question question = new Question(createQuestion.getQuestion(), questionAnswer);

            questionService.save(question);


            return new ResponseEntity(questionAnswer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("by-id/{id}")
    public ResponseEntity<Question> update(@PathVariable Integer id, @RequestBody UpdateQuestion updateQuestion) {
        try {
            Question question = questionService.getById(id).get();
            QuestionAnswer questionAnswer = questionAnswerService.getById(question.getAnswer().getId()).get();

            question.setQuestion(updateQuestion.getQuestion());
            questionAnswer.setAnswer(updateQuestion.getAnswer());

            questionAnswerService.save(questionAnswer);
            questionService.save(question);

            return new ResponseEntity(question, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("by-id/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        try {
            Question question = questionService.getById(id).get();
            QuestionAnswer questionAnswer = questionAnswerService.getById(question.getAnswer().getId()).get();

            questionService.delete(question);
            questionAnswerService.delete(questionAnswer);

            return new ResponseEntity(question, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    };
}
