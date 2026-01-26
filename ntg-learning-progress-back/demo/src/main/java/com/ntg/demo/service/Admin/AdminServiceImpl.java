package com.ntg.demo.service.Admin;

import com.ntg.demo.dto.*;
import com.ntg.demo.entity.Category;
import com.ntg.demo.entity.Topic;
import com.ntg.demo.entity.User;
import com.ntg.demo.enums.Status;
import com.ntg.demo.exception.CategoryAlreadyExistsException;
import com.ntg.demo.exception.InvalidInputException;
import com.ntg.demo.exception.NotFoundException;
import com.ntg.demo.mapper.CategoryMapper;
import com.ntg.demo.mapper.TopicMapper;
import com.ntg.demo.repository.CategoryRepo;
import com.ntg.demo.repository.TopicRepo;
import com.ntg.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CategoryRepo categoryRepo;
    private final CategoryMapper categoryMapper;
    private final TopicRepo topicRepo;
    private final UserRepository userRepo;
    private final TopicMapper topicMapper;


    @Override
    public void addCategory(CategoryDTO categoryDTO) {

         boolean isCategoryExists = categoryRepo.existsByNameIgnoreCase(categoryDTO.getName());

        if(categoryDTO.getName().isBlank()){
            throw new IllegalArgumentException("category name can not be null or empty");
        }

        if(isCategoryExists){
            throw new CategoryAlreadyExistsException("This category already exists");
        }

            try{

               Category category = categoryMapper.toEntity(categoryDTO);
                categoryRepo.save(category);

            } catch(Exception ex){
                log.error("ERROR while adding category {}: " , ex.getMessage());
            }


    }

    @Override
    public void addTopic(TopicDTO topicDTO) {

        if (topicRepo.existsByName(topicDTO.getName())){
            throw new InvalidInputException("Topic name is added before");
        }

        if(!topicDTO.getName().isEmpty() && topicDTO.getCategoryId() != null){
            try{

                Optional<Category> dbCategory = categoryRepo.findById(topicDTO.getCategoryId());
                if(dbCategory.isEmpty()){
                    throw new RuntimeException("Category not found ID: " + topicDTO.getCategoryId());
                }

                Topic topic = topicMapper.toEntity(topicDTO);
                topic.setCategory(dbCategory.get());
                topicRepo.save(topic);

            }catch (DataAccessException ex){
                log.error("ERROR while adding topic to category {}: ", ex.getMessage());
                throw ex;
            }
        }


    }

    @Transactional
    @Override
    public void deleteTopicById(Integer topicId) {
        if(topicId != null){
            Topic topic = topicRepo.findById(topicId)
                    .orElseThrow(()-> new NotFoundException("No Topic Found"));
            topic.setCategory(null);
            topicRepo.deleteById(topicId);
        }

    }

    @Override
    public void deleteCategoryById(Integer categoryId) {

        categoryRepo.deleteById(categoryId);
    }

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
    public UserProfile getUserProfileDetails(Integer userId) {

        if(userId == null){
            throw new IllegalArgumentException("userID must not be null ");
        }

            try{

               return userRepo.getUserProfileDetails(userId);

            }catch(DataAccessException ex){
                log.error("ERROR Occurred in getUserProfileDetails() {} ", ex.getMessage());
                throw ex;
            }

    }

    @Override
    public List<UsersWithOverAllProgress> getUsersWithOverAllProgress() {

        List<UsersWithOverAllProgress> usersWithOverAllProgressList =
                userRepo.getAllWithOverAllProgress();

        return usersWithOverAllProgressList;
    }

    @Override
    public Set<CategoryWithTopicsAndProgress> getAllCategoriesWithTopics() {

        Set<CategoryWithTopicsAndProgress> finalResult = new HashSet<>();

        List<CategoryTopicProjection> categoryTopicProjections = categoryRepo.getAllCategoriesWithTopics();

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
            //skip category with no topics created
            if(category.getTopicId() == null){
                continue;
            }

            TopicWithProgress topicWithProgress = new TopicWithProgress();
            topicWithProgress.setTopicId(category.getTopicId());
            topicWithProgress.setDescription(category.getTopicDescription());
            topicWithProgress.setName(category.getTopicName());
            topicWithProgress.setStatus(category.getTopicStatus());

            categoryWithTopicsAndProgress.getTopicWithProgressList().add(topicWithProgress);

        }

        finalResult.addAll(categoryWithTopicsAndProgressMap.values());

        System.out.println("Result size is " + finalResult.size());

        return finalResult;
    }

    @Override
    public void updateCategory(UpdateCategoryRequest updateCategoryRequest, Integer categoryId) {

        if(updateCategoryRequest != null) {
            Category category = categoryRepo.findById(categoryId)
                    .orElseThrow(() -> new NotFoundException("No Category Found"));

            categoryRepo.save(categoryMapper.updateCategoryFromDTO(category, updateCategoryRequest));

        }
    }

    @Transactional
    @Override
    public void updateTopic(UpdateTopicRequest updateTopicRequest, Integer topicId) {

        if(topicId != null){

            Topic topic = topicRepo.findById(topicId)
                    .orElseThrow(()-> new NotFoundException("No Topic Found"));
            Optional<Category> optionalCategory = Optional.ofNullable(categoryRepo.findCategoryByName(updateTopicRequest.getCategoryName())
                    .orElseThrow(() -> new NotFoundException("Category Not Found")));

            topic.setCategory(optionalCategory.get());

            topicRepo.save(topicMapper.updateTopicFromDTO(topic, updateTopicRequest));

        }

    }

    @Transactional
    @Override
    public void updateDevName(Integer userId, String devName ) {

        if(userId != null){
            User developer = userRepo.findById(userId)
                    .orElseThrow(()-> new NotFoundException("No Developer Found"));
            developer.setName(devName);
            userRepo.save(developer);
        }
    }

    @Override
    public List<CategoryProjection> getAllCategoryDropDown() {

        List<CategoryProjection> categoryDropDown = categoryRepo
                .getAllCategories();

        if(categoryDropDown.isEmpty()){
            throw new NotFoundException("No Categories created yet!");
        }
        return categoryDropDown;
    }

    @Override
    public void deleteUserProfileById(Integer userId) {
        if(userId == null){
            throw new IllegalArgumentException("user id can not be null");
        }

        if(!userRepo.existsById(userId)){
            throw new NotFoundException("No User Found with that ID ");
        }

        try{

            userRepo.deleteById(userId);

        }catch(DataAccessException ex){
            throw ex;
        }
    }




}
