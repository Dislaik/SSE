package com.sseiia.server.repository;

import com.sseiia.server.entity.Role;
import com.sseiia.server.entity.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketStatusRepository extends JpaRepository<TicketStatus, Integer> {

    //Optional<TicketStatus> findById(Integer id);
    Optional<TicketStatus> findByStatus(String status);
    Boolean existsByStatus(String status);
}
