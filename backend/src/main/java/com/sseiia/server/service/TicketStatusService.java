package com.sseiia.server.service;

import com.sseiia.server.entity.Role;
import com.sseiia.server.entity.TicketStatus;
import com.sseiia.server.repository.TicketStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketStatusService {

    @Autowired
    TicketStatusRepository ticketStatusRepository;

    public List<TicketStatus> findAll() {
        return ticketStatusRepository.findAll();
    }

    public Optional<TicketStatus> getById(Integer id) {
        return ticketStatusRepository.findById(id);
    }

    public Optional<TicketStatus> getByStatus(String status) {
        return ticketStatusRepository.findByStatus(status);
    }

    public TicketStatus save(TicketStatus status) {
        return ticketStatusRepository.save(status);
    }

    public void delete(TicketStatus status) {
        ticketStatusRepository.delete(status);
    }
}
