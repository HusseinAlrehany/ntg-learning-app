package com.ntg.demo.mapper;

import com.ntg.demo.dto.CategoryDTO;
import com.ntg.demo.dto.UpdateCategoryRequest;
import com.ntg.demo.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {


    public CategoryDTO toDTO(Category category){

        if(category == null){
            throw new NullPointerException("category can not be null");
        }

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        return categoryDTO;
    }

    public Category toEntity(CategoryDTO categoryDTO){

        if(categoryDTO == null){
            throw new NullPointerException("categoryDTO can not be null");
        }

        Category category = new Category();
        category.setName(categoryDTO.getName());

        return category;
    }

    public Category updateCategoryFromDTO(Category category, UpdateCategoryRequest updateCategoryRequest){
        category.setName(updateCategoryRequest.getName());

        return category;
    }

}
