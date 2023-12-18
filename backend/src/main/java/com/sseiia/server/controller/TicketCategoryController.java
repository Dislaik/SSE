package com.sseiia.server.controller;

import com.sseiia.server.entity.Role;
import com.sseiia.server.entity.TicketCategory;
import com.sseiia.server.service.TicketCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("ticket/category")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketCategoryController {

    @Autowired
    TicketCategoryService ticketCategoryService;


    //GET
    @GetMapping("")
    public ResponseEntity<List<TicketCategory>> getAll() {

        return new ResponseEntity(ticketCategoryService.getAll(), HttpStatus.OK);
    }

}
