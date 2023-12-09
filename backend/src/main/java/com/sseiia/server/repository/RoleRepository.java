package com.sseiia.server.repository;

import com.sseiia.server.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    //Optional<Role> findById(Integer id);
    Optional<Role> findByRole(String role);
    Boolean existsByRole(String role);
}
