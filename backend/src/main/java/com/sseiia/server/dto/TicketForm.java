package com.sseiia.server.dto;

import com.sseiia.server.entity.TicketCategory;
import com.sseiia.server.entity.TicketSubcategory;
import jakarta.validation.constraints.NotBlank;

public class TicketForm {

    @NotBlank
    private String username;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private Integer category;

    private Integer subcategory;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Integer subcategory) {
        this.subcategory = subcategory;
    }
}
