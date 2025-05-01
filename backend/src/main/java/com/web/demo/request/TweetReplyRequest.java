package com.web.demo.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TweetReplyRequest {
	private String content;
	private Long tweetId;
	private LocalDateTime createdAt;
	private String image;
	
	public Long getTweetId() {
		return tweetId;
	}

	public String getContent() {
		return content;
	}

	public String getImage() {
		return image;
	}
}
