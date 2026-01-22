package com.ntg.demo.repository;

import com.ntg.demo.dto.DeveloperProgressProjection;
import com.ntg.demo.entity.DeveloperProgress;
import com.ntg.demo.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProgressRepo extends JpaRepository<DeveloperProgress, Integer> {


@Query(value = """
        SELECT u.name AS devName,
        	   dp.status As status,
               t.name AS topicName,
               t.description AS description,
               c.name AS categoryName
        FROM user u
        INNER JOIN developer_progress dp
        ON u.id = dp.user_id
        INNER JOIN topic t
        ON t.id = dp.topic_id
        INNER JOIN category c
        ON c.id = t.category_id
        WHERE c.id = :categoryId AND u.id = :userId
        """, nativeQuery = true)
List<DeveloperProgressProjection> getDevTopicsWithProgress(@Param("userId") Integer userId,
                                                           @Param("categoryId") Integer categoryId);


@Query(value = """
               SELECT COUNT(*) FROM developer_progress dp
               INNER JOIN topic t
               ON t.id = dp.topic_id
               INNER JOIN category c
               ON c.id = t.category_id
               WHERE dp.user_id = :userId
               AND dp.status = :status
               AND c.id = :categoryId
               """, nativeQuery = true)
int countMasteredTopicsPerCategory(@Param("userId") Integer userId,
                                 @Param("status")Status status,
                                 @Param("categoryId") Integer categoryId);


@Query(value = """
                SELECT COUNT(*) FROM topic c
                WHERE c.category_id = :categoryId
               """, nativeQuery = true)
int countTopicsPerCategory(@Param("categoryId") Integer categoryId);



}
