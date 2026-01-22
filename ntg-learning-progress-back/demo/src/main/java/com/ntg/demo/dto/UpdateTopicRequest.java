package com.ntg.demo.dto;

import lombok.Data;

@Data
public class UpdateTopicRequest {

    private Integer topicId;
    private String topicName;
    private String categoryName;
}
