package com.ksteindl.logolo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer issueSequence = 0;
    // TODO seems reduntant
    private String projectKey;

    // Each project has one backlog, and a backlog only relyes on a project
    // Lazy is more resource friendly
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="project_id", nullable = false)
    @JsonIgnore
    private Project project;

    // OneToMany with the Issue-s


    public Backlog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIssueSequence() {
        return issueSequence;
    }

    public void setIssueSequence(Integer issueSequence) {
        this.issueSequence = issueSequence;
    }

    public String getProjectKey() {
        return projectKey;
    }

    public void setProjectKey(String projectKey) {
        this.projectKey = projectKey;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
