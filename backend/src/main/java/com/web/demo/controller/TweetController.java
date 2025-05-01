package com.web.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.demo.dto.TweetDto;
import com.web.demo.dto.mapper.TweetDtoMapper;
import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;
import com.web.demo.request.TweetReplyRequest;
import com.web.demo.response.ApiResponse;
import com.web.demo.service.TweetService;
import com.web.demo.service.UserService;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {
	
	@Autowired
	private TweetService tweetService;
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/create")
	public  ResponseEntity<TweetDto> createTweet(@RequestBody Tweet req, 
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		Tweet tweet = tweetService.createTweet(req, user);
		TweetDto tweetDto= TweetDtoMapper.toTweetDto(tweet, user);
		return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
	}
	
	@PostMapping("/{tweetId}/reply")
	public  ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest req, 
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		Tweet tweet = tweetService.createdReply(req, user);
		TweetDto tweetDto= TweetDtoMapper.toTweetDto(tweet, user);
		return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
	}
	@GetMapping("/{tweetId}/replies")
	public ResponseEntity<List<TweetDto>> getTweetReplies(@PathVariable Long tweetId,
	        @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
	    User user = userService.findUserProfileByJwt(jwt);
	    Tweet tweet = tweetService.findById(tweetId);
	    List<Tweet> replies = tweet.getReplyTweets();
	    List<TweetDto> replyDtos = TweetDtoMapper.toTweetDtos(replies, user);
	    return new ResponseEntity<>(replyDtos, HttpStatus.OK);
	}

	
	@PutMapping("/{tweetId}/retweet")
	public  ResponseEntity<TweetDto> retweet(@PathVariable Long tweetId, 
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		Tweet tweet = tweetService.retweet(tweetId, user);
		TweetDto tweetDto= TweetDtoMapper.toTweetDto(tweet, user);
		return new ResponseEntity<>(tweetDto, HttpStatus.OK);
	}
	
	@GetMapping("/{tweetId}")
	public  ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, 
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		Tweet tweet = tweetService.findById(tweetId);
		TweetDto tweetDto= TweetDtoMapper.toTweetDto(tweet, user);
		return new ResponseEntity<>(tweetDto, HttpStatus.OK);
	}
	@DeleteMapping("/{tweetId}")
	public  ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, 
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		tweetService.deleteTweetById(tweetId,user.getId());
		ApiResponse res= new ApiResponse();
		res.setMessage("Tweet Deleted Successfully");
		res.setStatus(true);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	
	
	@GetMapping("/")
	public  ResponseEntity<List<TweetDto>> getAllTweets(
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		List<Tweet> tweets = tweetService.findAllTweet();
		List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets,user);
		return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}")
	public  ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable Long userId,
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		 User requestedUser = userService.findUserById(userId); 
		List<Tweet> tweets = tweetService.getUserTweet(requestedUser);
		List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets,user);
		return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
	}
	@GetMapping("/user/{userId}/likes")
	public  ResponseEntity<List<TweetDto>> findTweetByLikesContainsUser(@PathVariable Long userId,
			@RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		List<Tweet> tweets = tweetService.findByLikesContainsUser(user);
		List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets,user);
		return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
	}


	

}
