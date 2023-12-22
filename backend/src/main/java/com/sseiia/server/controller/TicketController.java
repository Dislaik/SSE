package com.sseiia.server.controller;

import com.sseiia.server.dto.TicketForm;
import com.sseiia.server.dto.UpdateTicketStatus;
import com.sseiia.server.entity.*;
import com.sseiia.server.service.*;
import com.sseiia.server.utils.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("ticket")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    @Autowired
    TicketService ticketService;
    
    @Autowired
    UserService userService;

    @Autowired
    TicketStatusService ticketStatusService;

    @Autowired
    TicketSubcategoryService ticketSubcategoryService;

    @Autowired
    TicketAnswerService ticketAnswerService;

    //GET

    @GetMapping("")
    public ResponseEntity<List<Ticket>> findAll() {

        return new ResponseEntity(ticketService.findAll(), HttpStatus.OK);
    }

    @GetMapping("by-id/{id}")
    public ResponseEntity<Ticket> findById(@PathVariable Integer id) {

        return new ResponseEntity(ticketService.getById(id), HttpStatus.OK);
    }

    @GetMapping("by-user-id/{id}")
    public ResponseEntity<List<Ticket>> getByUserId(@PathVariable Integer id) {
        try {

            return new ResponseEntity(ticketService.getByUserId(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }

    //POST

    @PostMapping("")
    public ResponseEntity<Ticket> create(@Valid @RequestBody TicketForm ticketForm) {
        try {
            LocalDateTime localDate = LocalDateTime.now();
            User user = userService.getByUsername(ticketForm.getUsername()).get();
            TicketStatus status = ticketStatusService.getByStatus("open").get();
            TicketSubcategory subcategory = ticketSubcategoryService.getById(ticketForm.getSubcategory()).get();
            Ticket ticket = new Ticket(
                    ticketForm.getTitle(),
                    ticketForm.getDescription(),
                    user,
                    status,
                    subcategory,
                    localDate,
                    null

            );

            ticketService.save(ticket);

            return new ResponseEntity(ticket, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }

    //UPDATE
    @PutMapping("by-id/{id}")
    public ResponseEntity<Ticket> setStatus(@PathVariable Integer id, @RequestBody UpdateTicketStatus updateTicketStatus) {
        try {
            Ticket ticket = ticketService.getById(id).get();
            TicketStatus status = ticketStatusService.getById(updateTicketStatus.getStatusId()).get();

            ticket.setStatus(status);

            ticketService.save(ticket);

            return new ResponseEntity(ticket, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }

    //DELETE

    @DeleteMapping("by-id/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        try {
            Ticket ticket = ticketService.getById(id).get();
            List<TicketAnswer> answers = ticketAnswerService.getByTicketId(id).get();

            for (int i=0;i<answers.size();i++) {
                ticketAnswerService.delete(answers.get(i));
            }

            ticketService.delete(ticket);

            return new ResponseEntity(ticket, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }
}
