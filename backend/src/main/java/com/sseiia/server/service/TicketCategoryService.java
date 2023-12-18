package com.sseiia.server.service;

import com.sseiia.server.entity.TicketCategory;
import com.sseiia.server.repository.TicketCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketCategoryService {

    @Autowired
    TicketCategoryRepository ticketCategoryRepository;

    public List<TicketCategory> getAll() {
        return ticketCategoryRepository.findAll();
    }

    public Optional<TicketCategory> getById(Integer id) {
        return ticketCategoryRepository.findById(id);
    }

    public Optional<TicketCategory> getByCategory(String category) {
        return ticketCategoryRepository.findByCategory(category);
    }

    public TicketCategory save(TicketCategory category) {
        return ticketCategoryRepository.save(category);
    }

    public void delete(TicketCategory category) {
        ticketCategoryRepository.delete(category);
    }
}
