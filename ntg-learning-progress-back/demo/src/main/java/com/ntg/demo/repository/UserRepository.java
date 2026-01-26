package com.ntg.demo.repository;

import com.ntg.demo.dto.UserProfile;
import com.ntg.demo.dto.UsersWithOverAllProgress;
import com.ntg.demo.enums.UserRole;
import com.ntg.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findFirstByEmail(String userName);

    User findByRole(UserRole userRole);


    @Query(value = """ 
            SELECT  u.name AS devName,
                    u.id AS userId,
                    COALESCE(SUM(dp.status = 'MASTERED'), 0) AS mastered,
                    COALESCE(SUM(dp.status = 'IN_PROGRESS'), 0) AS inProgress,
            	    COALESCE(SUM(dp.status IS NULL), 0) AS notStarted                         
            FROM `user` u
            JOIN topic t
            ON 1 = 1
            LEFT JOIN  developer_progress dp
            ON dp.topic_id = t.id AND u.id = dp.user_id
            WHERE u.id = :userId
            GROUP BY u.id;
            """, nativeQuery = true)
    UserProfile getUserProfileDetails(@Param("userId") Integer userId);


    @Query(value = """
            SELECT
                    u.id AS userId,
                    u.name AS userName,
                    COALESCE(
                        ROUND(
                            (SUM(dp.status = 'MASTERED') * 100.0) / NULLIF(COUNT(dp.topic_id), 0)
                        , 0),
                    0
                    ) AS overAllProgress
                FROM user u
                LEFT JOIN developer_progress dp
                    ON dp.user_id = u.id
                GROUP BY u.id, u.name""",nativeQuery = true)
    List<UsersWithOverAllProgress> getAllWithOverAllProgress();



}
