package com.sseiia.server.controller;

import com.sseiia.server.dto.LoginUser;
import com.sseiia.server.dto.RegisterUser;
import com.sseiia.server.dto.TokenUser;
import com.sseiia.server.entity.Role;
import com.sseiia.server.entity.User;
import com.sseiia.server.jwt.Provider;
import com.sseiia.server.service.RoleService;
import com.sseiia.server.service.UserService;
import com.sseiia.server.utils.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    DaoAuthenticationProvider authenticationManager;

    @Autowired
    Provider provider;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterUser registerUser, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {

            return new ResponseEntity("Uknown error", HttpStatus.BAD_REQUEST);
        }

        String[] runSplit = registerUser.getRun().split("-");
        String username = runSplit[0].replace(".", "");

        if (userService.existsByUsername(username)) {
            return new ResponseEntity(new Response("Este usuario ya existe"), HttpStatus.BAD_REQUEST);
        }
        /*if (userService.existsByDocument(registerUser.getDocument()) {
            return new ResponseEntity(new Response("Nº de Serie o Documenta ya registrado"), HttpStatus.BAD_REQUEST);
        }*/
        if (userService.existsByEmail(registerUser.getEmail())) {
            return new ResponseEntity("El correo ya esta en uso", HttpStatus.BAD_REQUEST);
        }



        Role userRole = roleService.getByRole("user").get();
        User user = new User(username, passwordEncoder.encode(registerUser.getPassword()), registerUser.getEmail(), registerUser.getFirstName(), registerUser.getLastName(), userRole);


        userService.save(user);



        return new ResponseEntity(new Response("Usuario creado"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenUser> login(@Valid @RequestBody LoginUser loginUser) {
        try {
            String username = loginUser.getUsername();
            String password = loginUser.getPassword();

            if (username == null || username.isBlank() || password == null || password.isBlank()) {

                return new ResponseEntity("Faltan campos por rellenar", HttpStatus.BAD_REQUEST);
            }


            /*else if (userService.existsByUsername(username) && ) {
                return new ResponseEntity("Nombre de usuario y/o contraseña no son correctas", HttpStatus.BAD_REQUEST);
            } else if (!userService.existsByUsername(username)) {
                return new ResponseEntity("El usuario no existe", HttpStatus.NOT_FOUND);
            }*/

            //System.out.println(user.getUsername());
            //System.out.println(user.getPassword());

            UsernamePasswordAuthenticationToken usernameAuthentication = new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword());
            Authentication authentication = authenticationManager.authenticate(usernameAuthentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = provider.generateToken(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            TokenUser tokenUser = new TokenUser(jwt, userDetails.getUsername(), userDetails.getAuthorities());

            return new ResponseEntity(tokenUser, HttpStatus.OK);
        } catch (Exception e) {
            //System.out.println("PASA X CATCH ERROR");
            return new ResponseEntity("Nombre de usuario y/o contraseña no son correctas", HttpStatus.BAD_REQUEST);
        }

        /*if (bindingResult.hasErrors()) {
            return new ResponseEntity("Uknown error", HttpStatus.BAD_REQUEST);
        }*/
    }
}