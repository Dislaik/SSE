package com.sseiia.server.controller;

import com.sseiia.server.dto.TicketAnswerForm;
import com.sseiia.server.entity.Ticket;
import com.sseiia.server.entity.TicketAnswer;
import com.sseiia.server.entity.TicketCategory;
import com.sseiia.server.entity.User;
import com.sseiia.server.service.TicketAnswerService;
import com.sseiia.server.service.TicketService;
import com.sseiia.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("ticket/answer")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketAnswerController {
    @Autowired
    TicketAnswerService ticketAnswerService;

    @Autowired
    TicketService ticketService;

    @Autowired
    UserService userService;

    //GET
    @GetMapping("")
    public ResponseEntity<List<TicketAnswer>> getAll() {

        return new ResponseEntity(ticketAnswerService.getAll(), HttpStatus.OK);
    }

    @GetMapping("by-ticket-id/{id}")
    public ResponseEntity<List<TicketAnswer>> getByTicketId(@PathVariable Integer id) {

        return new ResponseEntity(ticketAnswerService.getByTicketId(id), HttpStatus.OK);
    }

    //POST

    @PostMapping("")
    public ResponseEntity<TicketAnswer> create(@Valid @RequestBody TicketAnswerForm ticketAnswerForm) {
        try {
            LocalDateTime localDate = LocalDateTime.now();
            Ticket ticket = ticketService.getById(ticketAnswerForm.getTicketId()).get();
            User user = userService.findByUsername(ticketAnswerForm.getUsername()).get();

            TicketAnswer ticketAnswer = new TicketAnswer(
                    ticketAnswerForm.getAnswer(),
                    ticket,
                    user,
                    localDate
            );

            ticketAnswerService.save(ticketAnswer);

            return new ResponseEntity(ticketAnswer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("asdas", HttpStatus.BAD_REQUEST);
        }
    }
}
