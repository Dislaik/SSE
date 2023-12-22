package com.sseiia.server.service;

import com.sseiia.server.entity.Log;
import com.sseiia.server.entity.LogType;
import com.sseiia.server.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogService {

    @Autowired
    LogRepository logRepository;

    public List<Log> getAll() {
        return logRepository.findAll();
    }

    public Optional<Log> getById(Integer id) {
        return logRepository.findById(id);
    }

    public Log save(Log log) {
        return logRepository.save(log);
    }

    public void delete(Log log) {
        logRepository.delete(log);
    }
}
