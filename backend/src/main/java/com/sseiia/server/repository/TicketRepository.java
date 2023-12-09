package com.sseiia.server.repository;

import com.sseiia.server.entity.Ticket;
import com.sseiia.server.entity.TicketStatus;
import com.sseiia.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByUserId(Integer id);
    Boolean existsByUserId(Integer id);
}
