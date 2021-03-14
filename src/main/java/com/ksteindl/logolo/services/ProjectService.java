package com.ksteindl.logolo.services;

import com.ksteindl.logolo.domain.Project;
import com.ksteindl.logolo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // TODO maybe introduce DTO above Entity?
    public Project saveOrUpdateProject(Project project) {
        return projectRepository.save(project);
    }

}
