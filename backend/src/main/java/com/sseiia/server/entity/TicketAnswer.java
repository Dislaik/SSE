package com.sseiia.server.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ticket_answer")
public class TicketAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String answer;

    @ManyToOne
    @JoinColumn(name = "id_ticket", referencedColumnName = "id", nullable = false, unique = false)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id", nullable = false, unique = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public TicketAnswer() {
    }

    public TicketAnswer(String answer, Ticket ticket, User user, LocalDateTime createdAt) {
        this.answer = answer;
        this.ticket = ticket;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
