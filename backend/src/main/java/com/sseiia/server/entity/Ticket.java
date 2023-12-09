package com.sseiia.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id", nullable = false, unique = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "id_ticket_status", referencedColumnName = "id", nullable = false, unique = false)
    private TicketStatus status;
    @ManyToOne
    @JoinColumn(name = "id_ticket_subcategory", referencedColumnName = "id", nullable = false, unique = false)
    private TicketSubcategory subcategory;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Ticket() {
    }

    public Ticket(String title, String description, User user, TicketStatus status, TicketSubcategory subcategory, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.title = title;
        this.description = description;
        this.user = user;
        this.status = status;
        this.subcategory = subcategory;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public TicketSubcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(TicketSubcategory subcategory) {
        this.subcategory = subcategory;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
