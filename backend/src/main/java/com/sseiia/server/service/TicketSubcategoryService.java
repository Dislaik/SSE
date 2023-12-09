package com.sseiia.server.service;

import com.sseiia.server.entity.TicketStatus;
import com.sseiia.server.entity.TicketSubcategory;
import com.sseiia.server.repository.TicketSubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketSubcategoryService {

    @Autowired
    TicketSubcategoryRepository ticketSubcategoryRepository;

    public List<TicketSubcategory> findAll() {
        return ticketSubcategoryRepository.findAll();
    }

    public Optional<TicketSubcategory> getById(Integer id) {
        return ticketSubcategoryRepository.findById(id);
    }

    public Optional<TicketSubcategory> getBySubcategory(String subcategory) {
        return ticketSubcategoryRepository.findBySubcategory(subcategory);
    }

    public TicketSubcategory save(TicketSubcategory subcategory) {
        return ticketSubcategoryRepository.save(subcategory);
    }

    public void delete(TicketSubcategory subcategory) {
        ticketSubcategoryRepository.delete(subcategory);
    }
}
