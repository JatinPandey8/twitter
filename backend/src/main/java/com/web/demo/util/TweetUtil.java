package com.web.demo.util;

import java.util.Iterator;

import com.web.demo.model.Like;
import com.web.demo.model.Tweet;
import com.web.demo.model.User;

public class TweetUtil {
	public final static boolean isLikedByReqUser(User reqUser,Tweet tweet) {
		for (Like like :tweet.getLikes()) {
			if(like.getUser().getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}
	public final static boolean isRetweetedByReqUser(User reqUser,Tweet tweet) {
		for (User user :tweet.getRetweetUser()) {
			if(user.getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}
}
