package com.sseiia.server.repository;

import com.sseiia.server.entity.TicketCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Integer> {
    //Optional<TicketCategory> findById(Integer id);
    Optional<TicketCategory> findByCategory(String category);
    Boolean existsByCategory(String category);
}
