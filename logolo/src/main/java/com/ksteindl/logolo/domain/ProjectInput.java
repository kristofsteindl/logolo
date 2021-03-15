package com.ksteindl.logolo.domain;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ProjectInput {

    @NotBlank(message = "Project name is required")
    private String projectName;

    @NotBlank(message = "Project key is required")
    @Size(min = 4, max = 5, message = "Please use 4 to 5 characters")
    private String projectKey;

    @NotBlank(message = "Project description is required")
    private String description;

    public ProjectInput() {
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectKey() {
        return projectKey;
    }

    public void setProjectKey(String projectKey) {
        this.projectKey = projectKey;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
