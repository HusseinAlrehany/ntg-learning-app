package com.ntg.demo.dto;

import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
public class CategoryWithTopicsAndProgress {

    private Integer categoryId;
    private String categoryName;
    private int categoryProgress;
    private int masteredTopics;
    private int totalTopics;
    private List<TopicWithProgress> topicWithProgressList;


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CategoryWithTopicsAndProgress that = (CategoryWithTopicsAndProgress) o;
        return Objects.equals(categoryId, that.categoryId) && Objects.equals(categoryName, that.categoryName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, categoryName);
    }
}
