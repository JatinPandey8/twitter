package com.web.demo.service;

import java.util.List;

import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Like;
import com.web.demo.model.User;

	public interface LikeService {
		public Like liketweet(Long tweetid, User user) throws UserException,TweetException;
		public List<Like> getAllLikes(Long tweetId) throws TweetException;
		
	}
