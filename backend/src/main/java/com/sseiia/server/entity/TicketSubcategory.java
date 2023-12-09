package com.sseiia.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "ticket_subcategory")
public class TicketSubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String subcategory;
    @ManyToOne
    @JoinColumn(name = "id_ticket_category", referencedColumnName = "id", nullable = false) /// Constraint Foreign Key(role) references role(id)
    private TicketCategory category;

    public TicketSubcategory() {
    }

    public TicketSubcategory(String subcategory, TicketCategory category) {
        this.subcategory = subcategory;
        this.category = category;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public TicketCategory getCategory() {
        return category;
    }

    public void setCategory(TicketCategory category) {
        this.category = category;
    }
}
