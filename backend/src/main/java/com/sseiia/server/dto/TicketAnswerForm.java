package com.sseiia.server.dto;

import jakarta.validation.constraints.NotBlank;

public class TicketAnswerForm {

    @NotBlank
    private String username;

    private Integer ticketId;

    @NotBlank
    private String answer;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
