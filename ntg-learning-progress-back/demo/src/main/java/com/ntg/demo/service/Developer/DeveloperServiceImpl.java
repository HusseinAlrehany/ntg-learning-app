package com.ntg.demo.service.Developer;

import com.ntg.demo.dto.*;
import com.ntg.demo.entity.Category;
import com.ntg.demo.entity.Topic;
import com.ntg.demo.enums.Status;
import com.ntg.demo.exception.NotFoundException;
import com.ntg.demo.mapper.TopicMapper;
import com.ntg.demo.repository.CategoryRepo;
import com.ntg.demo.repository.ProgressRepo;
import com.ntg.demo.repository.TopicRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeveloperServiceImpl implements DeveloperService{

    private final TopicRepo topicRepo;
    private final ProgressRepo progressRepo;
    private final CategoryRepo categoryRepo;
    private final TopicMapper topicMapper;

    @Override
    public List<TopicDTO> getAllTopics(Integer categoryId) {
        List<Topic> topics = new ArrayList<>();

        if(categoryId != null){
            topics = topicRepo.findTopicsByCategoryId(categoryId);
        }

        if (topics.isEmpty()){
            throw new NotFoundException("No Topics found for Category ID: " + categoryId);
        }

        log.info("Topics Found for category ID {} {} ", categoryId , topics.size());

        return topicMapper.toTopicDTOList(topics);
    }

    @Override
    public ProgressPerCategory getDevTopicsWithProgress(Integer userId, Integer categoryId) {

        ProgressPerCategory progressPerCategory = new ProgressPerCategory();

        List<DeveloperProgressProjection> developerProgressProjections = new ArrayList<>();

        if(categoryId != null && userId != null){
            try{
                developerProgressProjections =
                   progressRepo.getDevTopicsWithProgress(userId, categoryId);
                progressPerCategory.setDeveloperProgressProjections(developerProgressProjections);
                progressPerCategory.setCategoryProgress(calculateCategoryProgress(userId, categoryId));

            }catch (Exception ex){
                log.error("Error in getDevTopicsWithProgress() {} ", ex.getMessage());
            }
        }
        return progressPerCategory;
    }

    @Override
    public List<CategoryWithTopicsAndProgress> getAllCategoriesWithProgress(Integer userId) {

        List<CategoryWithTopicsAndProgress> categoriesWithProgress = new ArrayList<>();

        try {
            List<CategoryProjection> categories = categoryRepo.getAllCategories();

            for (CategoryProjection category : categories) {
                CategoryWithTopicsAndProgress categoryWithProgress = new CategoryWithTopicsAndProgress();
                categoryWithProgress.setCategoryId(category.getCategoryId());
                categoryWithProgress.setCategoryName(category.getCategoryName());


                int mastered = progressRepo.countMasteredTopicsPerCategory(
                        userId,
                        Status.MASTERED,
                        category.getCategoryId());
                int total = progressRepo.countTopicsPerCategory(category.getCategoryId());

                categoryWithProgress.setMasteredTopics(mastered);
                categoryWithProgress.setTotalTopics(total);
                categoryWithProgress.setCategoryProgress(
                        total == 0 ? 0 : (mastered * 100) / total);

                categoriesWithProgress.add(categoryWithProgress);
            }
        } catch (Exception ex) {
            log.error("Error in getAllCategoriesWithProgress() {} ", ex.getMessage());
        }

        return categoriesWithProgress;
    }

    private int calculateCategoryProgress(Integer userId, Integer categoryId){

        int mastered = progressRepo.countMasteredTopicsPerCategory(
                userId,
                Status.MASTERED,
                categoryId);

        int total = progressRepo.countTopicsPerCategory(categoryId);

        if (total == 0){
            return 0;
        }
        return (mastered * 100) / total;
    }

    //TODO To be Refactored
    @Override
    public Set<CategoryWithTopicsAndProgress> getAllCategoriesWithTopicsAndProgress(Integer userId) {
           Set<CategoryWithTopicsAndProgress> finalResult = new HashSet<>();

           List<CategoryTopicProjection> categoryTopicProjections = categoryRepo.getAllCategoriesWithTopicsAndProgress(userId);

           Map<Integer, CategoryWithTopicsAndProgress> categoryWithTopicsAndProgressMap = new HashMap<>();

           for(CategoryTopicProjection category: categoryTopicProjections){
               Integer categoryId = category.getCategoryId();

               CategoryWithTopicsAndProgress categoryWithTopicsAndProgress =  categoryWithTopicsAndProgressMap.get(categoryId);

               if(categoryWithTopicsAndProgress == null){

                   categoryWithTopicsAndProgress = new CategoryWithTopicsAndProgress();

                   categoryWithTopicsAndProgress.setCategoryId(categoryId);
                   categoryWithTopicsAndProgress.setCategoryName(category.getCategoryName());
                   categoryWithTopicsAndProgress.setTopicWithProgressList(new ArrayList<>());
                   categoryWithTopicsAndProgressMap.put(categoryId, categoryWithTopicsAndProgress);

               }

               TopicWithProgress topicWithProgress = new TopicWithProgress();
               topicWithProgress.setTopicId(category.getTopicId());
               topicWithProgress.setDescription(category.getTopicDescription());
               topicWithProgress.setName(category.getTopicName());
               topicWithProgress.setStatus(category.getTopicStatus());

               categoryWithTopicsAndProgress.getTopicWithProgressList().add(topicWithProgress);

           }

           for(CategoryWithTopicsAndProgress category: categoryWithTopicsAndProgressMap.values()){
                   int mastered = progressRepo.countMasteredTopicsPerCategory(userId, Status.MASTERED ,category.getCategoryId());
                   int total = progressRepo.countTopicsPerCategory(category.getCategoryId());

                   category.setMasteredTopics(mastered);
                   category.setTotalTopics(total);
                   category.setCategoryProgress(total == 0 ? 0 : (mastered * 100)/ total);

                finalResult.addAll(categoryWithTopicsAndProgressMap.values());

           }

           System.out.println("Result size is " + finalResult.size());

       return finalResult;

    }

    @Override
    public void addTopicToCategory(TopicDTO topicDTO) {

        if(topicDTO != null) {
            try {
                Category category = categoryRepo.findById(topicDTO.getCategoryId())
                        .orElseThrow(() -> new NotFoundException("No Category Found"));

                Topic topic = new Topic();
                topic.setName(topic.getName());
                topic.setDescription(topic.getDescription());
                topic.setCategory(category);

                topicRepo.save(topic);
            }catch(Exception ex){
                log.error("ERROR in addTopic()", ex.getMessage());
                throw ex;
            }
        }
    }




}
