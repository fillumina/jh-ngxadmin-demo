package com.fillumina.demo.ngxadmin.repository;

import com.fillumina.demo.ngxadmin.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
