package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Todo;@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{
	List<Todo> findByUsername(String username);
}
