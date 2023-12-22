package com.sseiia.server.dto;

import java.time.LocalDate;

public class CreateLog {

    private String description;

    private Integer type;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
