package com.sseiia.server.repository;

import com.sseiia.server.entity.TicketAnswer;
import com.sseiia.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketAnswerRepository extends JpaRepository<TicketAnswer, Integer> {

    Optional<List<TicketAnswer>> findByTicketId(Integer id);
    Optional<List<TicketAnswer>> findByUser(User user);
}
