package com.web.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.demo.dto.LikeDto;
import com.web.demo.dto.mapper.LikeDtoMapper;
import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Like;
import com.web.demo.model.User;
import com.web.demo.service.LikeService;
import com.web.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
	@Autowired
	private LikeService likeService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/{tweetId}/likes") 
	public ResponseEntity<LikeDto> likeTweet(@PathVariable Long tweetId,
			@RequestHeader("Authorization") String jwt) throws UserException,TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		Like like = likeService.liketweet(tweetId, user);
		LikeDto likeDto= LikeDtoMapper.toLikeDto(like, user);
		return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);
	}
	@PostMapping("/tweet/{tweetId}") 
	public ResponseEntity <List<LikeDto>> getAllLikes(@PathVariable Long tweetId,
			@RequestHeader("Authorization") String jwt) throws UserException,TweetException{
		User user =userService.findUserProfileByJwt(jwt);
		List<Like> likes = likeService.getAllLikes(tweetId);
		List<LikeDto> likeDtos= LikeDtoMapper.toLikeDtos(likes, user);
		return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
	}
	

}
