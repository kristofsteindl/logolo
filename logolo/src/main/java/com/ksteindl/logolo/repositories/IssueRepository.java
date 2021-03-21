package com.ksteindl.logolo.repositories;

import com.ksteindl.logolo.domain.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {
}
