package com.sseiia.server.controller;

import com.sseiia.server.dto.CreateLog;
import com.sseiia.server.dto.CreateQuestion;
import com.sseiia.server.entity.Log;
import com.sseiia.server.entity.LogType;
import com.sseiia.server.entity.Question;
import com.sseiia.server.entity.QuestionAnswer;
import com.sseiia.server.service.LogService;
import com.sseiia.server.service.LogTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("log")
@CrossOrigin(origins = "http://localhost:4200")
public class LogController {

    @Autowired
    LogService logService;

    @Autowired
    LogTypeService logTypeService;

    @GetMapping("")
    public ResponseEntity<List<Log>> getAll() {

        return new ResponseEntity(logService.getAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Log> create(@Valid @RequestBody CreateLog createLog) {
        try {
            LocalDateTime localDate = LocalDateTime.now();
            LogType type = logTypeService.getById(createLog.getType()).get();
            Log log = new Log(createLog.getDescription(), localDate, type);

            logService.save(log);

            return new ResponseEntity(log, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }
}
