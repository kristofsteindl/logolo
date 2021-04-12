package com.ksteindl.logolo.services;

import com.ksteindl.logolo.domain.*;
import com.ksteindl.logolo.exceptions.ResourceNotFoundException;
import com.ksteindl.logolo.exceptions.ValidationException;
import com.ksteindl.logolo.repositories.BacklogRepository;
import com.ksteindl.logolo.repositories.ProjectRepository;
import com.ksteindl.logolo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Task addTask(TaskInput taskInput) {
        Task task = new Task();

        String projectKey = taskInput.getProjectKey();
        Backlog backlog = backlogRepository.findByProjectKey(projectKey);
        if (backlog == null) {
            throw new ResourceNotFoundException("project", "Project key '" + projectKey.toUpperCase() + "' does not exist");
        }
        task.setBacklog(backlog);
        task.setProjectKey(projectKey);

        Integer backlogSequence = backlog.getTaskSequence();
        backlogSequence++;
        backlog.setTaskSequence(backlogSequence);
        task.setProjectSequence(projectKey + "-" + backlogSequence);

        task.setSummary(taskInput.getSummary());
        setPriorityWithDefault(task, taskInput);
        setStatusWithDefault(task, taskInput);

        return taskRepository.save(task);
    }

    public List<Task> findBacklogById(String projectKey) {
        if (null == projectRepository.findByProjectKey(projectKey)) {
            throw new ResourceNotFoundException("project", "Project is not found with key " + projectKey);
        }
        return taskRepository.findByProjectKeyOrderByPriority(projectKey);
    }


    public Task findTaskById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("task", "Cannot find task with id '" + id + "'"));
    }

    // TODO - see TODO.md
    public Task findTaskByProjectSequence(String projectKey, String projectSequence) {
        Project project = projectRepository.findByProjectKey(projectKey);
        if (null == project) {
            throw new ResourceNotFoundException("project", "Project is not found with key " + projectKey);
        }
        Task task = taskRepository.findByProjectSequence(projectSequence);
        if (task == null) {
            throw new ResourceNotFoundException("task", "Task is not found with key " + projectSequence);
        }
        if (!task.getBacklog().getProjectKey().equals(project.getProjectKey())) {
            throw new ValidationException("Task " + projectSequence + " does not exist in project " + projectKey);
        }
        return task;
    }


    public Task updateTask(TaskInput taskInput, Long id) {
        Task task = findTaskById(id);
        return updateTask(task, taskInput);
    }

    // TODO - this method should be deleted
    public Task updateTask(TaskInput taskInput, String projectKey, String projectSequence) {
        Task task = findTaskByProjectSequence(projectKey, projectSequence);
        return updateTask(task, taskInput);
    }

    public void deleteTaskByProjectSequence(Long id) {
        Task task = findTaskById(id);
        taskRepository.delete(task);
    }

    public void deleteTaskByProjectSequence(String projectKey, String projectSequence) {
        Task task = findTaskByProjectSequence(projectKey, projectSequence);
        taskRepository.delete(task);
    }

    private Task updateTask(Task task, TaskInput taskInput) {
        try {
            task.setSummary(taskInput.getSummary());
            setPriorityWithDefault(task, taskInput);
            setStatusWithDefault(task, taskInput);
            return taskRepository.save(task);
        } catch (DataIntegrityViolationException dataIntegrityViolationException) {
            throw new ValidationException("During database persisting,  'DataIntegrityViolationException' was thrown. This means the previously defined validation rule(s) was/were violated.");
        }
    }

    // TODO Status MUST be refactored to entity, stored in DB (to be able add and modify)
    private void setStatusWithDefault(Task task, TaskInput taskInput) {
        String status = taskInput.getStatus();
        if (status == null || status.equals("")) {
            task.setStatus("TO_DO");
        } else {
            task.setStatus(status);
        }
    }

    private void setPriorityWithDefault(Task task, TaskInput taskInput) {
        Integer priority = taskInput.getPriority();
        if (priority == null || priority == 0) {
            task.setPriority(3);
        } else {
            task.setPriority(priority);
        }
    }



}
