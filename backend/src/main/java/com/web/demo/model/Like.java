package com.web.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="likes")
public class Like {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "likes_seq_gen")
    @SequenceGenerator(name = "likes_seq_gen", sequenceName = "likes_seq", allocationSize = 1)
    private Long id;
	
	@ManyToOne 
	private User user;

	@ManyToOne
	private Tweet tweet;


    // Getter and Setter for 'user'
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Getter and Setter for 'tweet'
    public Tweet getTweet() {
        return tweet;
    }

    public void setTweet(Tweet tweet) {
        this.tweet = tweet;
    }
	
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
