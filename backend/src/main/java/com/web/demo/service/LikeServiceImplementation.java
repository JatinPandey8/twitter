package com.web.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Like;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;
import com.web.demo.repository.LikeRepository;
import com.web.demo.repository.TweetRepository;


@Service 
public class LikeServiceImplementation implements LikeService{
	
	@Autowired
	private LikeRepository likeRepository;
	@Autowired
	private TweetService tweetService;
	@Autowired
	private TweetRepository tweetRepository;


	@Override
	public Like liketweet(Long tweetid, User user) throws UserException, TweetException {
		Like isLikeExist = likeRepository.isLikeExist(user.getId(), tweetid);
		if(isLikeExist != null) {
		    likeRepository.deleteById(isLikeExist.getId());
		    // Return a dummy Like with the original tweet and user
		    Tweet tweet = tweetService.findById(tweetid); // required downstream
		    Like dummyLike = new Like();
		    dummyLike.setTweet(tweet);
		    dummyLike.setUser(user);
		    return dummyLike;
		}

		Tweet tweet =tweetService.findById(tweetid);
		Like like = new Like();
		like.setTweet(tweet);
		like.setUser(user);
		Like savedLike =likeRepository.save(like);
		tweet.getLikes().add(savedLike); //tweet
		tweetRepository.save(tweet);
		return savedLike;
	}

	@Override
	public List<Like> getAllLikes(Long tweetId) throws TweetException {
		Tweet tweet = tweetService.findById(tweetId);
		 List<Like> likes =likeRepository.findByTweetId(tweetId);
		return likes;
	}

}
