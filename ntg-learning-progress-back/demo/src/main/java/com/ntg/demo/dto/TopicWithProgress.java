package com.ntg.demo.dto;

import lombok.Data;

@Data
public class TopicWithProgress {
    private Integer topicId;
    private String name;
    private String description;
    private String status;
}
