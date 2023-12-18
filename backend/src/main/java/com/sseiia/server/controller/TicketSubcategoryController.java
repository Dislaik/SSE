package com.sseiia.server.controller;

import com.sseiia.server.entity.TicketCategory;
import com.sseiia.server.entity.TicketSubcategory;
import com.sseiia.server.service.TicketSubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("ticket/category/subcategory")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketSubcategoryController {
    @Autowired
    TicketSubcategoryService ticketSubcategoryService;

    //GET
    @GetMapping("")
    public ResponseEntity<List<TicketSubcategory>> getAll() {

        return new ResponseEntity(ticketSubcategoryService.getAll(), HttpStatus.OK);
    }
}
