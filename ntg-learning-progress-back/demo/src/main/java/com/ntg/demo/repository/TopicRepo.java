package com.ntg.demo.repository;

import com.ntg.demo.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TopicRepo extends JpaRepository<Topic, Integer> {


    boolean existsByName(String name);

   // List<Topic> findAllByCategory_Id(Integer categoryId);

    @Query("""
            SELECT t FROM Topic t
            JOIN FETCH t.category
            WHERE t.category.id = :categoryId
            """)
    List<Topic> findTopicsByCategoryId(@Param("categoryId") Integer categoryId);



}
