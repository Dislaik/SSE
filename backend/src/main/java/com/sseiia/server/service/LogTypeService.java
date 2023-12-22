package com.sseiia.server.service;

import com.sseiia.server.entity.LogType;
import com.sseiia.server.entity.QuestionAnswer;
import com.sseiia.server.repository.LogTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogTypeService {

    @Autowired
    LogTypeRepository logTypeRepository;

    public List<LogType> getAll() {
        return logTypeRepository.findAll();
    }

    public Optional<LogType> getById(Integer id) {
        return logTypeRepository.findById(id);
    }

    public LogType save(LogType logType) {
        return logTypeRepository.save(logType);
    }

    public void delete(LogType logType) {
        logTypeRepository.delete(logType);
    }
}
