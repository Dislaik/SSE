package com.sseiia.server.repository;

import com.sseiia.server.entity.TicketSubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketSubcategoryRepository extends JpaRepository<TicketSubcategory, Integer> {
    //Optional<TicketCategory> findById(Integer id);
    Optional<TicketSubcategory> findBySubcategory(String subcategory);
    Boolean existsBySubcategory(String subcategory);
}
