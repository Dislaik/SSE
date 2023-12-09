package com.sseiia.server.service;

import com.sseiia.server.entity.User;
import com.sseiia.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    public User save(User user) {
        return userRepository.save(user);
    }
    public void delete(User user) {
        userRepository.delete(user);
    }
}
