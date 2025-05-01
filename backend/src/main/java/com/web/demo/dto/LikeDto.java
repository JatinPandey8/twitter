//package com.web.demo.dto;
//
//
//public class LikeDto {
//    private Long id;
//    private UserDto user;
//    private TweetDto tweet; 
//    
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    // Getter and Setter for user
//    public UserDto getUser() {
//        return user;
//    }
//
//    public void setUser(UserDto user) {
//        this.user = user;
//    }
//
//    // Getter and Setter for tweet
//    public TweetDto getTweet() {
//        return tweet;
//    }
//
//    public void setTweet(TweetDto tweet) {
//        this.tweet = tweet;
//    }
//}
package com.web.demo.dto;

public class LikeDto {

    private Long id;
    private String content;
    private String image;
    private Long userId;
    private String createdAt;
	private TweetDto tweet;
	private UserDto user;

    public LikeDto() {}

    public LikeDto(Long id, String content, String image, Long userId, String createdAt) {
        this.id = id;
        this.content = content;
        this.image = image;
        this.userId = userId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public TweetDto getTweet() {
        return tweet;
    }

    public void setTweet(TweetDto tweet) {
        this.tweet = tweet;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
    
}
