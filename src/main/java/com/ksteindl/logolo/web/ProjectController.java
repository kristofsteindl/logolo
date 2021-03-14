package com.ksteindl.logolo.web;

import com.ksteindl.logolo.domain.Project;
import com.ksteindl.logolo.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // TODO we should introduce inputObject as @ResquestBody instead of Entity (very bad practice) or even instead of DTO (still bad practice)
    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(result.getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)), HttpStatus.BAD_REQUEST);
        }
        Project persisted = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(persisted, HttpStatus.CREATED);
    }

}
