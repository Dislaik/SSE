package com.sseiia.server.service;

import com.sseiia.server.entity.TicketAnswer;
import com.sseiia.server.entity.TicketCategory;
import com.sseiia.server.entity.User;
import com.sseiia.server.repository.TicketAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketAnswerService {

    @Autowired
    TicketAnswerRepository ticketAnswerRepository;


    public List<TicketAnswer> getAll() {
        return ticketAnswerRepository.findAll();
    }

    public Optional<List<TicketAnswer>> getByTicketId(Integer id) {
        return ticketAnswerRepository.findByTicketId(id);
    }

    public Optional<List<TicketAnswer>> getByUser(User user) {
        return ticketAnswerRepository.findByUser(user);
    }

    public TicketAnswer save(TicketAnswer ticketAnswer) {
        return ticketAnswerRepository.save(ticketAnswer);
    }

    public void delete(TicketAnswer ticketAnswer) {
        ticketAnswerRepository.delete(ticketAnswer);
    }
}
