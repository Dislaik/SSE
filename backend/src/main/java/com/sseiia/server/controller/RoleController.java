package com.sseiia.server.controller;

import com.sseiia.server.entity.Role;
import com.sseiia.server.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("role")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {
    @Autowired
    RoleService roleService;

    //GET

    @GetMapping("")
    public ResponseEntity<List<Role>> findAll() {

        return new ResponseEntity(roleService.findAll(), HttpStatus.OK);
    }

    @GetMapping("by-id/{id}")
    public ResponseEntity<Role> getById(@PathVariable Integer id) {

        return new ResponseEntity(roleService.getById(id), HttpStatus.OK);
    }

    @GetMapping("by-role/{role}")
    public ResponseEntity<Role> getByRole(@PathVariable String role) {

        return new ResponseEntity(roleService.getByRole(role), HttpStatus.OK);
    }

    //POST

    //UPDATE

    //DELETE
}

