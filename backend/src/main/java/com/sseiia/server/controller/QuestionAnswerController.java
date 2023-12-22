package com.sseiia.server.controller;

import com.sseiia.server.entity.*;
import com.sseiia.server.service.QuestionAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question/answer")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionAnswerController {

    @Autowired
    QuestionAnswerService questionAnswerService;

    @GetMapping("")
    public ResponseEntity<List<QuestionAnswer>> getAll() {

        return new ResponseEntity(questionAnswerService.getAll(), HttpStatus.OK);
    }

    /*@PostMapping("")
    public ResponseEntity<QuestionAnswer> create(@Valid @RequestBody CreateQuestionAnswer createQuestionAnswer) {
        try {
            QuestionAnswer questionAnswer = new QuestionAnswer(createQuestionAnswer.getAnswer());

            questionAnswerService.save(questionAnswer);

            return new ResponseEntity(questionAnswer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }*/

}
