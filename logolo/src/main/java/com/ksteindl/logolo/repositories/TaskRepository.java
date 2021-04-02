package com.ksteindl.logolo.repositories;

import com.ksteindl.logolo.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findByProjectKeyOrderByPriority(String id);
}
