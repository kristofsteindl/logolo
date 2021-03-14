package com.ksteindl.logolo.web;

import com.ksteindl.logolo.domain.Project;
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

    // TODO we should introduce inputObject as @ResquestBody instead of Entity (very bad practice) or even instead of DTO (still bad practice)
    // TODO we should definitely get rid of this '<?>' sonsense. Instead of that, we should
    @PostMapping("")
    public ResponseEntity<Project> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
        mapValidationErrorService.validate(result);
        Project persisted = projectService.saveProject(project);
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
    public ResponseEntity<Project> updateProject(@Valid @RequestBody Project project, @PathVariable Long id, BindingResult result) {
        mapValidationErrorService.validate(result);
        Project updated = projectService.updateProject(project, id);
        return new ResponseEntity(updated, HttpStatus.CREATED);

    }

}
