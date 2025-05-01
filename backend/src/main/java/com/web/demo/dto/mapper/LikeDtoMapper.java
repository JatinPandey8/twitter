package com.web.demo.dto.mapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.web.demo.dto.LikeDto;
import com.web.demo.dto.TweetDto;
import com.web.demo.dto.UserDto;
import com.web.demo.model.Like;
import com.web.demo.model.User;

public class LikeDtoMapper {
	public static LikeDto toLikeDto(Like like, User reqUser) {
		UserDto user =UserDtoMapper.toUserDto(like.getUser());
		UserDto reqUserDto =UserDtoMapper.toUserDto(reqUser);
		TweetDto tweet =TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);
		
		LikeDto likeDto=new LikeDto();
		likeDto.setId(like.getId());
		likeDto.setTweet(tweet);
		likeDto.setUser(user);
		return likeDto;
	}
	public static List<LikeDto>  toLikeDtos(List<Like> likes, User reqUser) {
		List<LikeDto> likeDtos = new ArrayList<>();
		for(Like like:likes) {
			UserDto user= UserDtoMapper.toUserDto(reqUser);
			TweetDto tweet =TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);
			LikeDto likeDto=new LikeDto();
			likeDto.setId(like.getId());
			likeDto.setTweet(tweet);
			likeDto.setUser(user);		
			likeDtos.add(likeDto);
	}
		return likeDtos;
	}

}
