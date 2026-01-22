package com.ntg.demo.controller.AdminController;

import com.ntg.demo.ApiResponse.ApiResponse;
import com.ntg.demo.dto.*;
import com.ntg.demo.service.Admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/ntg-learning/admin")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/add-category")
    public ResponseEntity<ApiResponse<String>> addCategory(@RequestBody CategoryDTO categoryDTO){

        adminService.addCategory(categoryDTO);

        return ResponseEntity.ok(new ApiResponse<>("Category Added Successfully"));
    }

    @PostMapping("/add-topic")
    public ResponseEntity<ApiResponse<String>> addTopic(@RequestBody TopicDTO topicDTO){

        adminService.addTopic(topicDTO);

        return ResponseEntity.ok(new ApiResponse<>("Topic Added Successfully"));
    }


    @GetMapping("/all-topics/{categoryId}")
    public ResponseEntity<List<TopicDTO>> getAllTopics(@PathVariable Integer categoryId){

        return ResponseEntity.ok(adminService.getAllTopics(categoryId));
    }

    @GetMapping("/get-user-profile")
    public ResponseEntity<UserProfile> getUserProfileDetails(@RequestParam  Integer userId){

        return ResponseEntity.ok(adminService.getUserProfileDetails(userId));

    }

    @GetMapping("/get-all-with-overall-progress")
    public ResponseEntity<List<UsersWithOverAllProgress>> getAllWithOverAllProgress(){

        return ResponseEntity.ok(adminService.getUsersWithOverAllProgress());
    }

    @DeleteMapping("/deleteUserById")
    public ResponseEntity<ApiResponse<String>> deleteUserById(@RequestParam Integer userId){
        adminService.deleteUserProfileById(userId);
        return ResponseEntity.ok(new ApiResponse<>("User Deleted Successfully"));
    }

    @GetMapping("/manage-topics")
    public ResponseEntity<Set<CategoryWithTopicsAndProgress>> getAllTopicsWithCategories(){

        return ResponseEntity.ok(adminService.getAllCategoriesWithTopics());
    }

    @DeleteMapping("/deleteTopic")
    public ResponseEntity<ApiResponse<String>> deleteTopicById(@RequestParam Integer topicId){

        adminService.deleteTopicById(topicId);

        return ResponseEntity.ok(new ApiResponse<>("Topic deleted successfully"));
    }

    @DeleteMapping("/admin/deleteCategory")
    public ResponseEntity<ApiResponse<String>> deleteCategoryById(@RequestParam Integer categoryId){

        adminService.deleteCategoryById(categoryId);

        return ResponseEntity.ok(new ApiResponse<>("Category deleted successfully"));
    }




}
