package com.sseiia.server.service;

import com.sseiia.server.entity.Ticket;
import com.sseiia.server.entity.User;
import com.sseiia.server.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    TicketRepository ticketRepository;

    public List<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getById(Integer id) {
        return ticketRepository.findById(id);
    }

    public List<Ticket> getByUserId(Integer id) {
        return ticketRepository.findByUserId(id);
    }

    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void delete(Ticket ticket) {
        ticketRepository.delete(ticket);
    }
}