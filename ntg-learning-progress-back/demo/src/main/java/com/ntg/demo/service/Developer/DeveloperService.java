package com.ntg.demo.service.Developer;

import com.ntg.demo.dto.CategoryWithTopicsAndProgress;
import com.ntg.demo.dto.ProgressPerCategory;
import com.ntg.demo.dto.TopicDTO;

import java.util.List;
import java.util.Set;

public interface DeveloperService {

    List<TopicDTO> getAllTopics(Integer categoryId);

    ProgressPerCategory getDevTopicsWithProgress(Integer userId, Integer categoryId);


    List<CategoryWithTopicsAndProgress> getAllCategoriesWithProgress(Integer userId);

    Set<CategoryWithTopicsAndProgress> getAllCategoriesWithTopicsAndProgress(Integer userId);

    void addTopicToCategory(TopicDTO topicDTO);

}
