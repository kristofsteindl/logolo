package com.ksteindl.logolo.web;

import com.ksteindl.logolo.domain.Project;
import com.ksteindl.logolo.domain.ProjectInput;
import com.ksteindl.logolo.services.MapValidationErrorService;
import com.ksteindl.logolo.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<Project> createNewProject(@Valid @RequestBody ProjectInput projectInput, BindingResult result) {
        mapValidationErrorService.validate(result);
        Project persisted = projectService.saveProject(projectInput);
        return new ResponseEntity(persisted, HttpStatus.CREATED);
    }

    @GetMapping("/{projectKey}")
    public ResponseEntity<Project> getProjectByKey(@PathVariable String projectKey) {
        Project project = projectService.findProjectByKey(projectKey);
        return new ResponseEntity(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProject() {
        return projectService.findAllProjects();
    }

    @DeleteMapping("/{projectKey}")
    public ResponseEntity<String> deleteProject(@PathVariable String projectKey) {
        projectService.deleteProjectByKey(projectKey);
        return new ResponseEntity("Project with id " + projectKey + " has been deleted", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@Valid @RequestBody ProjectInput projectInput, @PathVariable Long id, BindingResult result) {
        mapValidationErrorService.validate(result);
        Project updated = projectService.updateProject(projectInput, id);
        return new ResponseEntity(updated, HttpStatus.CREATED);

    }

}