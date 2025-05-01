package com.web.demo.model;

import java.util.List;



import org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyProperties.AssertingParty.Verification;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
	
	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.AUTO) // automatically create id when we create user
	private Long Id;
	
	private String fullName;
	private String location;
	private String website;
	private String birthDate;
	private String email;
	private String password;
	private String mobile;
	private String image;
	private String backgroundImage;
	private String bio;
	private String req_user;// whenever we did user findbyid then we will check in our local storage token head which is added(that user) and findbyid (wala user) are they both same 
	private boolean login_with_google;// user which is created is it by google sign or given his email and pass

	@JsonIgnore
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL) // in tweet model, we will get user field which helps us not to use table
	private List<Tweet> tweet = new ArrayList<>();
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)//cascadetype: whenever we delete a user, all the likes will be deleted
	private List<Like> likes = new ArrayList<>();
	
	@Embedded
	private Verifications verification;
	@ManyToMany(mappedBy = "replyTweetUser")
	private List<Tweet> repliedTweets = new ArrayList<>();
	
	public boolean isLogin_with_google() {
        return login_with_google;
    }
	
	@JsonIgnore
@ManyToMany //one user can have and follow multiple followers
	private List<User> followers = new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany 
	private List<User> following = new ArrayList<>();
	
	@ManyToMany(mappedBy = "retweetUser")
	private List<Tweet> retweets = new ArrayList<>(); // unsure

	public String getPassword() {
	    return this.password;  // Return the actual password field value
	}

	public String getEmail() {
	    return this.email;  // Return the actual email field value
	}

	public String getFullName() {
	    return this.fullName;  // Return the actual fullName field value
	}

	public String getBirthDate() {
	    return this.birthDate;  // Return the actual birthDate field value
	}

	public void setEmail(String email) {
	    this.email = email;  // Set the email field to the provided value
	}

	public void setFullName(String fullName) {
	    this.fullName = fullName;  // Set the fullName field to the provided value
	}

	public void setPassword(String password) {
	    this.password = password;  // Set the password field to the provided value
	}

	public void setBirthDate(String birthDate) {
	    this.birthDate = birthDate;  // Set the birthDate field to the provided value
	}

	public void setVerification(Verifications verification) {
	    this.verification = verification;  // Set the verification field to the provided value
	}
	
	public void setId(Long Id) {
	    this.Id = Id;
	}

	public Long getId() {
	    return Id;  // Return the actual 'id' value
	}
	public String getLocation() {
	    return location;
	}

	public void setLocation(String location) {
	    this.location = location;
	}

	// Getter and Setter for website
	public String getWebsite() {
	    return website;
	}

	public void setWebsite(String website) {
	    this.website = website;
	}

	// Getter and Setter for mobile
	public String getMobile() {
	    return mobile;
	}

	public void setMobile(String mobile) {
	    this.mobile = mobile;
	}

	// Getter and Setter for image
	public String getImage() {
	    return image;
	}

	public void setImage(String image) {
	    this.image = image;
	}

	// Getter and Setter for backgroundImage
	public String getBackgroundImage() {
	    return backgroundImage;
	}

	public void setBackgroundImage(String backgroundImage) {
	    this.backgroundImage = backgroundImage;
	}

	// Getter and Setter for bio
	public String getBio() {
	    return bio;
	}

	public void setBio(String bio) {
	    this.bio = bio;
	}

	// Getter and Setter for req_user
	public String getReq_user() {
	    return req_user;
	}

	public void setReq_user(String req_user) {
	    this.req_user = req_user;
	}

	
	public void setLogin_with_google(boolean login_with_google) {
	    this.login_with_google = login_with_google;
	}

	// Getter and Setter for tweets
	public List<Tweet> getTweet() {
	    return tweet;
	}

	public void setTweet(List<Tweet> tweet) {
	    this.tweet = tweet;
	}

	// Getter and Setter for likes
	public List<Like> getLikes() {
	    return likes;
	}

	public void setLikes(List<Like> likes) {
	    this.likes = likes;
	}

	// Getter and Setter for verification
	public Verifications getVerification() {
	    return verification;
	}

	

	// Getter and Setter for repliedTweets
	public List<Tweet> getRepliedTweets() {
	    return repliedTweets;
	}

	public void setRepliedTweets(List<Tweet> repliedTweets) {
	    this.repliedTweets = repliedTweets;
	}

	// Getter and Setter for followers
	public List<User> getFollowers() {
	    return followers;
	}

	public void setFollowers(List<User> followers) {
	    this.followers = followers;
	}

	// Getter and Setter for following
	public List<User> getFollowing() {
	    return following;
	}

	public void setFollowing(List<User> following) {
	    this.following = following;
	}

	// Getter and Setter for retweets
	public List<Tweet> getRetweets() {
	    return retweets;
	}

	public void setRetweets(List<Tweet> retweets) {
	    this.retweets = retweets;
	}
	

}
