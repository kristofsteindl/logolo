package com.ksteindl.logolo.services;

import com.ksteindl.logolo.domain.Backlog;
import com.ksteindl.logolo.domain.Task;
import com.ksteindl.logolo.domain.TaskInput;
import com.ksteindl.logolo.exceptions.ProjectNotFoundException;
import com.ksteindl.logolo.exceptions.ProjectValidationException;
import com.ksteindl.logolo.repositories.BacklogRepository;
import com.ksteindl.logolo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(TaskInput taskInput) {
        // Exceptions: Project not found
        Task task = new Task();
        // All Tasks to be added a specific project, which is not null, BL exitsts
        String projectKey = taskInput.getProjectKey();
        Backlog backlog = backlogRepository.findByProjectKey(projectKey);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project key '" + projectKey.toUpperCase() + "' does not exist");
        }
        // set BL to the Task
        task.setBacklog(backlog);
        // we want our project sequence like this PROS-1, PROS-2
        Integer backlogSequence = backlog.getTaskSequence();

        // update the BL Sequence
        backlogSequence++;
        backlog.setTaskSequence(backlogSequence);
        task.setProjectSequence(projectKey + "-" + backlogSequence);
        task.setProjectKey(projectKey);

        task.setSummary(taskInput.getSummary());
        // Initial priority when priority is null
        Integer priority = taskInput.getPriority();
        if (priority == null || priority == 0) {
            task.setPriority(3);
        }

        // Initial status when status is null
        // TODO Status MUST be refactored to entity, stored in DB (to be able add and modify)
        String status = taskInput.getStatus();
        if (status == null || status.equals("")) {
            task.setStatus("TO DO");
        }

        return taskRepository.save(task);

    }

    public List<Task> findBacklogById(String backlogId) {
        return taskRepository.findByProjectKeyOrderByPriority(backlogId);
    }
}
