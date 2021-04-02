package com.ksteindl.logolo.web;

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


    @GetMapping("/{backlogId}")
    public ResponseEntity<List<Task>> getProjectBacklog(@PathVariable String backlogId) {
        return new ResponseEntity<List<Task>>(taskService.findBacklogById(backlogId), HttpStatus.OK);

    }

}
