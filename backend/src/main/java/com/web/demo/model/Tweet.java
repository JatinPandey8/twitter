package com.web.demo.model;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data //use getter and setters, constructors without define
public class Tweet {
	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@ManyToOne //one user can create multiple tweets  
    @JoinColumn(name = "user_id")
	private User user;
	
	private String content;
	private String image;
	private String video;
	
	@OneToMany(mappedBy = "tweet",cascade = CascadeType.ALL)//one user can only like once, but one tweet can contain multiple likes
	private List<Like> likes = new ArrayList<>();
	
	@OneToMany // one tweet can contain mutiple reply but one reply only can be of that tweet
	private List<Tweet> replyTweets = new ArrayList<>();
	
	@ManyToMany
	private List<User> replyTweetUser = new ArrayList<>();//how many user retweeted
	
	@ManyToOne
	private Tweet replyFor;
	
	@ManyToMany
	 private List<User> retweetUser = new ArrayList<>();
	
	private boolean isReply; // help us to create tweeet reply, it will tell us wheter it is replt or tweet
	private boolean isTweet;// usertweet
	
	private LocalDateTime createdAt;
	

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for user
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Getter and Setter for retweetUser
    public List<User> getRetweetUser() {
        return retweetUser;
    }

    public void setRetweetUser(List<User> retweetUser) {
        this.retweetUser = retweetUser;
    }

    // Getter and Setter for isReply
    public boolean isReply() {
        return isReply;
    }

    public void setReply(boolean isReply) {
        this.isReply = isReply;
    }

    // Getter and Setter for isTweet
    public boolean isTweet() {
        return isTweet;
    }

    public void setTweet(boolean isTweet) {
        this.isTweet = isTweet;
    }

    // Getter and Setter for createdAt
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
 // Getter for likes
    public List<Like> getLikes() {
        return likes;  // return the list of likes
    }

    // Setter for likes
    public void setLikes(List<Like> likes) {
        this.likes = likes;  // set the list of likes
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Getter and Setter for content
 // Getter and Setter for content

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter and Setter for image
    public String  getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Getter and Setter for video
    public String  getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    // Getter and Setter for replyTweets
    public List<Tweet> getReplyTweets() {
        return replyTweets;
    }

    public void setReplyTweets(List<Tweet> replyTweets) {
        this.replyTweets = replyTweets;
    }

    // Getter and Setter for replyFor (Tweet that this tweet is replying to)
    public Tweet getReplyFor() {
        return replyFor;
    }

    public void setReplyFor(Tweet replyFor) {
        this.replyFor = replyFor;
    }

	
}
	

