package com.web.demo.dto.mapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.web.demo.dto.TweetDto;
import com.web.demo.dto.UserDto;
import com.web.demo.model.Like;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;
import com.web.demo.util.TweetUtil;

public class TweetDtoMapper {
	public static TweetDto toTweetDto(Tweet tweet,User reqUser) {
		UserDto user =UserDtoMapper.toUserDto(tweet.getUser());
		boolean isLiked=TweetUtil.isLikedByReqUser(reqUser,tweet);
		boolean isRetweeted=TweetUtil.isRetweetedByReqUser(reqUser, tweet);
		
		List<Long> retweetUserId = new ArrayList<>();
		
		for (User user1 :tweet.getRetweetUser()) {
			retweetUserId.add(user1.getId());
		}
		TweetDto tweetDto= new TweetDto();
		tweetDto.setId(tweet.getId());
		tweetDto.setContent(tweet.getContent());
		tweetDto.setCreatedAt(tweet.getCreatedAt());
		tweetDto.setImage(tweet.getImage());
		tweetDto.setTotalLikes(tweet.getLikes().size());
		tweetDto.setTotalReplies(tweet.getReplyTweets().size());
		tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
		tweetDto.setUser(user);
		tweetDto.setLiked(isLiked);
		tweetDto.setRetweet(isRetweeted);
		tweetDto.setRetweetUsersId(retweetUserId);
		tweetDto.setReplyTweets(toTweetDtos(tweet.getReplyTweets(),reqUser));
		tweetDto.setVideo(tweet.getVideo());
		List<UserDto> likeUsers = new ArrayList<>();
		for (Like like : tweet.getLikes()) {
		    likeUsers.add(UserDtoMapper.toUserDto(like.getUser()));
		}
		tweetDto.setLikes(likeUsers);

		return tweetDto;
	}
	public static List<TweetDto> toTweetDtos(List<Tweet> tweets,User reqUser){
		List<TweetDto> tweetDtos = new ArrayList<>();
		for (Tweet tweet:tweets) {
			TweetDto tweetDto = toReplyTweetDto(tweet,reqUser);
			tweetDtos.add(tweetDto);
			
		}
		return tweetDtos;
	}
	private static TweetDto toReplyTweetDto(Tweet tweet, User reqUser) {
		UserDto user =UserDtoMapper.toUserDto(tweet.getUser());
		boolean isLiked=TweetUtil.isLikedByReqUser(reqUser,tweet);
		boolean isRetweeted=TweetUtil.isRetweetedByReqUser(reqUser, tweet);
		
		List<Long> retweetUserId = new ArrayList<>();
		
		for (User user1 :tweet.getRetweetUser()) {
			retweetUserId.add(user1.getId());
		}
		TweetDto tweetDto= new TweetDto();
		tweetDto.setId(tweet.getId());
		tweetDto.setContent(tweet.getContent());
		tweetDto.setCreatedAt(tweet.getCreatedAt());
		tweetDto.setImage(tweet.getImage());
		tweetDto.setTotalLikes(tweet.getLikes().size());
		tweetDto.setTotalReplies(tweet.getReplyTweets().size());
		tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
		tweetDto.setUser(user);
		tweetDto.setLiked(isLiked);
		tweetDto.setRetweet(isRetweeted);
		tweetDto.setRetweetUsersId(retweetUserId);
		tweetDto.setVideo(tweet.getVideo());
		List<UserDto> likeUsers = new ArrayList<>();
		for (Like like : tweet.getLikes()) {
		    likeUsers.add(UserDtoMapper.toUserDto(like.getUser()));
		}
		tweetDto.setLikes(likeUsers);

		return tweetDto;
	}
}
