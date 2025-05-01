package com.web.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.demo.model.Tweet;
import com.web.demo.model.User;

public interface TweetRepository  extends JpaRepository<Tweet, Long>{
	List<Tweet> findAllByIsTweetTrueOrderByCreatedAtDesc(); // if tweets are true then resent them in order by manner by time
	List<Tweet> findByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(User user, Long userId); // thee people who hae retweeted. 
	List<Tweet> findByLikesContainingOrderByCreatedAtDesc(User user); // we will get list of how many twweets user has liked
	
	@Query("SELECT t FROM Tweet t JOIN t.likes l WHERE l.user.id = :userId")
	List<Tweet> findByLikesUser_id(@Param("userId") Long userId); // twwet likes 
	
}
