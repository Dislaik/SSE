package com.sseiia.server.controller;

import com.sseiia.server.entity.User;
import com.sseiia.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    //GET

    @GetMapping("")
    public ResponseEntity<List<User>> findAll() {

        return new ResponseEntity(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("by-id/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id) {

        return new ResponseEntity(userService.findById(id), HttpStatus.OK);
    }

    @GetMapping("by-username/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {

        return new ResponseEntity(userService.findByUsername(username), HttpStatus.OK);
    }

    @GetMapping("by-email/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {

        return new ResponseEntity(userService.findByEmail(email), HttpStatus.OK);
    }

    //POST

    //UPDATE

    //DELETE


}
