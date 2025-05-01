package com.web.demo.service;

import java.util.List;

import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;
import com.web.demo.request.TweetReplyRequest;

public interface TweetService {
	public Tweet createTweet(Tweet req,User user) throws UserException;
	public List<Tweet>findAllTweet();
	public Tweet retweet(Long tweetid,User user) throws UserException,TweetException;
	public Tweet findById(Long tweetId) throws TweetException;
	
	public void deleteTweetById(Long tweetid, Long userid) throws UserException,TweetException;
	public Tweet removeFromRetweet(Long tweetid, User userid) throws UserException,TweetException;
	public Tweet createdReply(TweetReplyRequest req, User userid) throws TweetException;
	public List<Tweet>getUserTweet(User user);
	public List<Tweet>findByLikesContainsUser(User user);
	
	
}
