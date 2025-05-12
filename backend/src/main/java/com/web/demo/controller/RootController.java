package com.web.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import com.web.demo.dto.TweetDto;
import com.web.demo.exception.TweetException;
import com.web.demo.exception.UserException;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;
import com.web.demo.service.TweetService;
import com.web.demo.service.UserService;
import com.web.demo.dto.mapper.TweetDtoMapper;
import org.springframework.http.HttpStatus;
import com.web.demo.response.ApiResponse;

@RestController
public class RootController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(
            @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.findAllTweet();
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }
}