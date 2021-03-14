package com.ksteindl.logolo.services;

import com.ksteindl.logolo.domain.Project;
import com.ksteindl.logolo.exceptions.ValidationException;
import com.ksteindl.logolo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // TODO maybe introduce DTO above Entity?
    public Project saveProject(Project project) {
        try {
            project.setProjectKey(project.getProjectKey().toUpperCase());
            Project found = projectRepository.findByProjectKey(project.getProjectKey());
            if (found != null) {
                throw new ValidationException("Project with key '" + found.getProjectKey() + "' already exists");
            }
            return projectRepository.save(project);
            // It is because the javax.persistence Entity validation. This is redundant, but double check is better then no check.
        } catch (DataIntegrityViolationException dataIntegrityViolationException) {
            throw new ValidationException("During database persisting,  'DataIntegrityViolationException' was thrown. This means the previously defined validation rule(s) was/were violated.");
        }
    }


    public Project findProjectByKey(String projectKey) {
        Project project = projectRepository.findByProjectKey(projectKey.toUpperCase());
        if (project == null) {
            throw new ValidationException("Project key '" + projectKey.toUpperCase() + "' does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByKey(String projectKey) {
        Project project = projectRepository.findByProjectKey(projectKey.toUpperCase());
        if (project == null) {
            throw new ValidationException("Cannot delete project with key '" + projectKey + "'. This project does not exist.");
        }
        projectRepository.delete(project);
    }

    public Project updateProject(Project project, Long id) {
        Optional<Project> oldProjectOptional = projectRepository.findById(id);
        if (!oldProjectOptional.isPresent()) {
            throw new ValidationException("Cannot find project with id '" + id + "'");
        }
        Project oldProject = oldProjectOptional.get();
        if (!oldProject.getProjectKey().equals(project.getProjectKey())) {
            throw new ValidationException("The key of the project cannot changed (actual: " + oldProject.getProjectKey() + ", given: " + project.getProjectKey() + ")");
        }
        try {
            project.setId(oldProject.getId());
            return projectRepository.save(project);
        } catch (DataIntegrityViolationException dataIntegrityViolationException) {
            throw new ValidationException("During database persisting,  'DataIntegrityViolationException' was thrown. This means the previously defined validation rule(s) was/were violated.");
        }
    }



}
