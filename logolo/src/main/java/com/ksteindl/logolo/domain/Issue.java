package com.ksteindl.logolo.domain;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false)
    private String projectSequence;
    private String summary;
    private String acceptanceCriteria;
    private String status;
    private Integer priority;
    private LocalDate dueDate;
    // ManyToOne with the backlog

    @Column(updatable = false)
    private String projectKey;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public Issue() {
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    @Override
    public String toString() {
        return "Issue{" +
                "id=" + id +
                ", projectSequence='" + projectSequence + '\'' +
                ", summary='" + summary + '\'' +
                ", acceptanceCriteria='" + acceptanceCriteria + '\'' +
                ", status='" + status + '\'' +
                ", priority=" + priority +
                ", dueDate=" + dueDate +
                ", projectKey='" + projectKey + '\'' +
                '}';
    }
}
