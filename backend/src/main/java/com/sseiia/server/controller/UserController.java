package com.sseiia.server.controller;

import com.sseiia.server.dto.RegisterUser;
import com.sseiia.server.dto.UpdateTicketStatus;
import com.sseiia.server.dto.UpdateUser;
import com.sseiia.server.entity.*;
import com.sseiia.server.service.RoleService;
import com.sseiia.server.service.TicketAnswerService;
import com.sseiia.server.service.TicketService;
import com.sseiia.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    TicketService ticketService;

    @Autowired
    TicketAnswerService ticketAnswerService;

    @Autowired
    PasswordEncoder passwordEncoder;

    //GET

    @GetMapping("")
    public ResponseEntity<List<User>> getAll() {

        return new ResponseEntity(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("by-id/{id}")
    public ResponseEntity<User> getById(@PathVariable Integer id) {

        return new ResponseEntity(userService.getById(id), HttpStatus.OK);
    }

    @GetMapping("by-username/{username}")
    public ResponseEntity<User> getByUsername(@PathVariable String username) {

        return new ResponseEntity(userService.getByUsername(username), HttpStatus.OK);
    }

    @GetMapping("by-email/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable String email) {

        return new ResponseEntity(userService.getByEmail(email), HttpStatus.OK);
    }

    //POST

    @PostMapping("")
    public ResponseEntity<User> create(@Valid @RequestBody RegisterUser registerUser) {
        try {
            Role role = roleService.getById(registerUser.getRole()).get();
            System.out.println(role);
            User user = new User(registerUser.getUsername(), passwordEncoder.encode(registerUser.getPassword()), registerUser.getEmail(), registerUser.getFirstName(), registerUser.getLastName(), role);

            userService.save(user);

            return new ResponseEntity(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    }

    //UPDATE

    @PutMapping("by-id/{id}")
    public ResponseEntity<Ticket> update(@PathVariable Integer id, @RequestBody UpdateUser updateUser) {
        try {
            User user = userService.getById(id).get();
            Role role = roleService.getById(updateUser.getRole()).get();

            user.setUsername(updateUser.getUsername());
            user.setPassword(passwordEncoder.encode(updateUser.getPassword()));
            user.setEmail(updateUser.getEmail());
            user.setFirstName(updateUser.getFirstName());
            user.setLastName(updateUser.getLastName());
            user.setRole(role);

            userService.save(user);

            return new ResponseEntity(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    };


    //DELETE

    @DeleteMapping("by-id/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        try {
            User user = userService.getById(id).get();
            List<Ticket> ticket = ticketService.getByUserId(id);

            for (int i=0;i<ticket.size();i++) {
                List<TicketAnswer> answers = ticketAnswerService.getByTicketId(ticket.get(i).getId()).get();

                for (int j=0;j<answers.size();j++) {
                    ticketAnswerService.delete(answers.get(j));
                }

                ticketService.delete(ticket.get(i));
            }


            userService.delete(user);

            return new ResponseEntity(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Ha ocurrido un error inesperado.", HttpStatus.BAD_REQUEST);
        }
    };


}
