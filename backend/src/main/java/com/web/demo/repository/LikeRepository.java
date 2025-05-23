package com.web.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.demo.model.Like;
// in like like and long are defined

public interface LikeRepository extends JpaRepository<Like, Long>{
	
	@Query("SELECT l FROM Like l WHERE l.user.id=:userId AND l.tweet.id=:tweetId")
	public Like isLikeExist(@Param("userId")Long userId, @Param("tweetId")Long tweetId);
	
	@Query("SELECT l FROM Like l WHERE l.tweet.id=:tweetId")
	public List<Like> findByTweetId(@Param("tweetId")Long tweetId);
	
} 
