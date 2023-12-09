package com.sseiia.server.controller;

import com.sseiia.server.dto.TicketForm;
import com.sseiia.server.entity.Ticket;
import com.sseiia.server.entity.TicketStatus;
import com.sseiia.server.entity.TicketSubcategory;
import com.sseiia.server.entity.User;
import com.sseiia.server.service.TicketService;
import com.sseiia.server.service.TicketStatusService;
import com.sseiia.server.service.TicketSubcategoryService;
import com.sseiia.server.service.UserService;
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

    //GET

    @GetMapping("")
    public ResponseEntity<List<Ticket>> findAll() {

        return new ResponseEntity(ticketService.findAll(), HttpStatus.OK);
    }

    @GetMapping("by-id/{id}")
    public ResponseEntity<Ticket> findById(@PathVariable Integer id) {

        return new ResponseEntity(ticketService.getById(id), HttpStatus.OK);
    }

    @GetMapping("by-user/{id}")
    public ResponseEntity<List<Ticket>> getByUser(@PathVariable Integer id) {
        try {

            return new ResponseEntity(ticketService.getByUserId(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("asdas", HttpStatus.BAD_REQUEST);
        }
    }

    //POST

    @PostMapping("")
    public ResponseEntity<Ticket> create(@Valid @RequestBody TicketForm ticketForm) {
        try {
            LocalDateTime localDate = LocalDateTime.now();
            User user = userService.findByUsername(ticketForm.getUsername()).get();
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
            System.out.println(localDate);

            ticketService.save(ticket);

            return new ResponseEntity(ticket, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("asdas", HttpStatus.BAD_REQUEST);
        }

    }

    //UPDATE

    //DELETE
}
