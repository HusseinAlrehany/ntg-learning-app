package com.ntg.demo.repository;

import com.ntg.demo.dto.CategoryProjection;
import com.ntg.demo.dto.CategoryTopicProjection;
import com.ntg.demo.entity.Category;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category,Integer> {

     boolean existsByNameIgnoreCase(String name);

    @Query(value = """
        SELECT c.id AS categoryId,
               c.name AS categoryName
        FROM category c
        ORDER BY c.name
        """, nativeQuery = true)
    List<CategoryProjection> getAllCategories();


    //DEV
    @Query(value = """
            select c.id AS categoryId,
                   c.name AS categoryName,
                   t.id AS topicId,
                   t.name AS topicName,
                   t.description AS topicDescription,
                   coalesce(dp.status, 'NOT_STARTED') AS topicStatus
            FROM category c
            INNER JOIN topic t
            ON c.id = t.category_id
            LEFT JOIN developer_progress dp
            ON dp.topic_id = t.id AND dp.user_id = :userId
            ORDER BY t.name, c.name;
            """,nativeQuery = true)
    List<CategoryTopicProjection> getAllCategoriesWithTopicsAndProgress(@Param("userId") Integer userId);


    //ADMIN
    @Query(value = """
            SELECT c.id AS categoryId,
                   t.id AS topicId,
                   t.name AS topicName,
                   c.name AS categoryName
            FROM category c
            LEFT JOIN topic t
            ON t.category_id = c.id
            """,nativeQuery = true)
    List<CategoryTopicProjection> getAllCategoriesWithTopics();


    @EntityGraph(attributePaths = {"topics"})
    Optional<Category> findCategoryByName(String name);



}
