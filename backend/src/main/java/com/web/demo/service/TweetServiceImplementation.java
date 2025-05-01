package com.web.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;
import com.web.demo.repository.TweetRepository;
import com.web.demo.request.TweetReplyRequest;

@Service
public class TweetServiceImplementation implements TweetService{
	
	@Autowired
	private TweetRepository tweetRepository;

	@Override
	public Tweet createTweet(Tweet req, User user) throws UserException {
		Tweet tweet = new Tweet();
		tweet.setContent(req.getContent());
		tweet.setCreatedAt(LocalDateTime.now());
		tweet.setImage(req.getImage());
		tweet.setUser(user);
		tweet.setReply(false);
		tweet.setTweet(true);
		tweet.setVideo(req.getVideo());
		return tweetRepository.save(tweet);
	}

	@Override
	public List<Tweet> findAllTweet() {
		return tweetRepository.findAllByIsTweetTrueOrderByCreatedAtDesc();
	}

	@Override
	public Tweet retweet(Long tweetid, User user) throws UserException, TweetException {
		Tweet tweet =findById(tweetid);
		if(tweet.getRetweetUser().contains(user)) {
			tweet.getRetweetUser().remove(user);
		}
		else {
			tweet.getRetweetUser().add(user);
		}
		return tweetRepository.save(tweet);
	}

	@Override
	public Tweet findById(Long tweetId) throws TweetException {
		Tweet tweet =tweetRepository.findById(tweetId)
				.orElseThrow(()-> new TweetException("Tweet Not Found"+tweetId));
		return tweet;
	}

	@Override
	public void deleteTweetById(Long tweetid, Long userid) throws UserException, TweetException {
		Tweet tweet =findById(tweetid);
		//if (!userid.equals(((Tweet) tweet.getRetweetUser()).getId())) {
		if (!tweet.getUser().getId().equals(userid)) {
		    throw new UserException("You can't delete another person's tweet");
		}

		tweetRepository.deleteById(tweet.getId());
		
	}

	@Override
	public Tweet removeFromRetweet(Long tweetid, User userid) throws TweetException, UserException {		
		return null;		
	}

	@Override
	public Tweet createdReply(TweetReplyRequest req, User userid) throws TweetException {
		Tweet replyFor = findById(req.getTweetId());
		Tweet tweet = new Tweet();
		tweet.setContent(req.getContent());
		tweet.setCreatedAt(LocalDateTime.now());
		tweet.setImage(req.getImage());
		tweet.setUser(userid);
		tweet.setReply(true);
		tweet.setTweet(false);
		tweet.setReplyFor(replyFor);
		
		Tweet savedReply =tweetRepository.save(tweet);
		replyFor.getReplyTweets().add(savedReply);
		tweetRepository.save(replyFor);
		
 			return replyFor;
	}

	@Override
	public List<Tweet> getUserTweet(User user) {
		return tweetRepository.findByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(user, user.getId());
	}

	@Override
	public List<Tweet> findByLikesContainsUser(User user) {
		return tweetRepository.findByLikesUser_id(user.getId());
	}

}
