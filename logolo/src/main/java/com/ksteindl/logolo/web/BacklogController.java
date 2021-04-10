package com.ksteindl.logolo.web;

import com.ksteindl.logolo.domain.Project;
import com.ksteindl.logolo.domain.ProjectInput;
import com.ksteindl.logolo.domain.Task;
import com.ksteindl.logolo.domain.TaskInput;
import com.ksteindl.logolo.services.MapValidationErrorService;
import com.ksteindl.logolo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/backlog")
@CrossOrigin // TODO maybe we should remove this?
public class BacklogController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<Task> addTaskToBacklog(@Valid @RequestBody TaskInput taskInput,BindingResult result) {
        mapValidationErrorService.throwExceptionIfNotValid(result);
        Task newTask = taskService.addTask(taskInput);
        return new ResponseEntity<Task>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("/{projectKey}")
    public ResponseEntity<List<Task>> getProjectBacklog(@PathVariable String projectKey) {
        return new ResponseEntity(taskService.findBacklogById(projectKey), HttpStatus.OK);
    }


    // TODO this should be definetily be refactored. Maybe projectSequence can be renamed and/or
    @GetMapping("/{projectKey}/{projectSequence}")
    public ResponseEntity<Task> getTask(@PathVariable String projectKey, @PathVariable String projectSequence) {
        Task task = taskService.findTaskByProjectSequence(projectKey, projectSequence);
        return new ResponseEntity(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody TaskInput taskInput, BindingResult result) {
        mapValidationErrorService.throwExceptionIfNotValid(result);
        Task task = taskService.updateTask(taskInput, id);
        return new ResponseEntity(task, HttpStatus.CREATED);
    }

    // TODO - this endpoint should be deleted
    @PutMapping("/{projectKey}/{projectSequence}")
    public ResponseEntity<Task> updateTask(@PathVariable String projectKey, @PathVariable String projectSequence, @Valid @RequestBody TaskInput taskInput, BindingResult result) {
        mapValidationErrorService.throwExceptionIfNotValid(result);
        Task task = taskService.updateTask(taskInput, projectKey, projectSequence);
        return new ResponseEntity(task, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTaskByProjectSequence(id);
        return new ResponseEntity("Task with id " + id + " has been deleted", HttpStatus.OK);
    }

    // TODO - this endpoint should be deleted
    @DeleteMapping("/{projectKey}/{projectSequence}")
    public ResponseEntity<String> deleteTask(@PathVariable String projectKey, @PathVariable String projectSequence) {
        taskService.deleteTaskByProjectSequence(projectKey, projectSequence);
        return new ResponseEntity("Task with project sequence " + projectSequence + " has been deleted", HttpStatus.OK);
    }


}
