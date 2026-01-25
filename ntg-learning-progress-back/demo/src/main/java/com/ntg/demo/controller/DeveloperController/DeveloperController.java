package com.ntg.demo.controller.DeveloperController;

import com.ntg.demo.ApiResponse.ApiResponse;
import com.ntg.demo.dto.CategoryWithTopicsAndProgress;
import com.ntg.demo.dto.ProgressPerCategory;
import com.ntg.demo.dto.TopicDTO;
import com.ntg.demo.entity.User;
import com.ntg.demo.enums.Status;
import com.ntg.demo.service.Developer.DeveloperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/ntg-learning/dev")
@PreAuthorize("hasAuthority('DEVELOPER')")
@RequiredArgsConstructor
public class DeveloperController {


    private final DeveloperService developerService;


    @GetMapping("/all-topics/{categoryId}")
    public ResponseEntity<List<TopicDTO>> getAllTopics(@PathVariable Integer categoryId){

        return ResponseEntity.ok(developerService.getAllTopics(categoryId));
    }

    @GetMapping("/all-topics-with-progress/{categoryId}")
    public ResponseEntity<ProgressPerCategory> getAllTopicsWithProgress(@AuthenticationPrincipal User user, @PathVariable Integer categoryId){

        return ResponseEntity.ok(developerService.getDevTopicsWithProgress(user.getId(), categoryId));
    }

    @GetMapping("/all-topics-with-progress")
    public ResponseEntity<List<CategoryWithTopicsAndProgress>> getAllCategoriesWithProgress(@AuthenticationPrincipal User user){

        return ResponseEntity.ok(developerService.getAllCategoriesWithProgress(user.getId()));

    }

    @GetMapping("/topics-with-progress")
    public ResponseEntity<Set<CategoryWithTopicsAndProgress>> getAllCatTopicWithProgress(@AuthenticationPrincipal User user){

        return ResponseEntity.ok(developerService.getAllCategoriesWithTopicsAndProgress(user.getId()));
    }


    @PutMapping("/updateProgressStatus")
    public ResponseEntity<ApiResponse<String>> updateProgressStatus(@RequestParam  Integer topicId,
                                                                    @RequestParam  Status status,
                                                                    @AuthenticationPrincipal User user){

        developerService.updateProgressStatus(topicId, status, user.getId());

        return ResponseEntity.ok(new ApiResponse<>("Status updated Successfully"));

    }

}
