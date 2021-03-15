package com.ksteindl.logolo.services;

import com.ksteindl.logolo.domain.Project;
import com.ksteindl.logolo.domain.ProjectInput;
import com.ksteindl.logolo.exceptions.ValidationException;
import com.ksteindl.logolo.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveProject(ProjectInput projectInput) {
        try {
            Project project = convertToProject(projectInput);
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

    public Project updateProject(ProjectInput projectInput, Long id) {
        Project oldProject = projectRepository.findById(id).orElseThrow(() -> new ValidationException("Cannot find project with id '" + id + "'"));
        if (!oldProject.getProjectKey().equals(projectInput.getProjectKey())) {
            throw new ValidationException("The key of the project cannot changed (actual: " + oldProject.getProjectKey() + ", given: " + projectInput.getProjectKey() + ")");
        }
        try {
            Project toBeUpdated = convertToProject(projectInput);
            toBeUpdated.setId(oldProject.getId());
            return projectRepository.save(toBeUpdated);
        } catch (DataIntegrityViolationException dataIntegrityViolationException) {
            throw new ValidationException("During database persisting,  'DataIntegrityViolationException' was thrown. This means the previously defined validation rule(s) was/were violated.");
        }
    }

    private Project convertToProject(ProjectInput projectInput) {
        Project project = new Project();
        project.setProjectKey(projectInput.getProjectKey().toUpperCase());
        project.setProjectName(projectInput.getProjectName());
        project.setDescription((projectInput.getDescription()));
        return project;
    }



}
