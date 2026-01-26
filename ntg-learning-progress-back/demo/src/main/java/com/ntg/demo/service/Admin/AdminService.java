package com.ntg.demo.service.Admin;

import com.ntg.demo.dto.*;

import java.util.List;
import java.util.Set;

public interface AdminService {

    void addCategory(CategoryDTO categoryDTO);

    void addTopic(TopicDTO topicDTO);

    void deleteTopicById(Integer topicId);

    void deleteCategoryById(Integer categoryId);

    void deleteUserProfileById(Integer userId);

    List<TopicDTO> getAllTopics(Integer categoryId);

    UserProfile getUserProfileDetails(Integer userId);

    List<UsersWithOverAllProgress> getUsersWithOverAllProgress();

    Set<CategoryWithTopicsAndProgress> getAllCategoriesWithTopics();

    void updateCategory(UpdateCategoryRequest updateCategoryRequest, Integer categoryId);

    void updateTopic(UpdateTopicRequest updateTopicRequest, Integer topicId);

    //List<CategoryDTO> getAllCategories();

    void updateDevName(Integer userId, String devName);


    List<CategoryProjection> getAllCategoryDropDown();



}
