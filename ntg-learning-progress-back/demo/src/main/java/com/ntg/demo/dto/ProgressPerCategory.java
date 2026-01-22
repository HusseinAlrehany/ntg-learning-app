package com.ntg.demo.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProgressPerCategory {

    private Integer categoryId;
    private String categoryName;
    private List<DeveloperProgressProjection> developerProgressProjections;
    private int categoryProgress;
    private int masteredTopics;
    private int totalTopics;
}
