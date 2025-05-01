package com.web.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.demo.config.JwtProvider;
import com.web.demo.exception.UserException;
import com.web.demo.model.User;
import com.web.demo.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public User findUserById(Long userId) throws UserException {
		User user =userRepository.findById(userId)
				.orElseThrow(()->new UserException("user not found with id"+userId) );
		return user;
	}

//	@Override
//	public User findUserProfileByJwt(String jwt) throws UserException {
//		String email = jwtProvider.getEmailFromTokenString(jwt);
//		User user=userRepository.findByEmail(email);
//		if (user==null) {
//			throw new UserException("User not found"+email);
//		}
//		return user;
//	}
	
	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
	    // Extract actual token from "Bearer <token>" if needed
	    if (jwt.startsWith("Bearer ")) {
	        jwt = jwt.substring(7); // remove "Bearer " prefix
	    }

	    String email = jwtProvider.getEmailFromTokenString(jwt);  // now token is clean
	    User user = userRepository.findByEmail(email);
	    if (user == null) {
	        throw new UserException("User not found: " + email);
	    }
	    return user;
	}


	@Override
	public User updateUser(Long userId, User req) throws UserException {
		User user = findUserById(userId);
		  if (req.getFullName() != null) user.setFullName(req.getFullName());
		    if (req.getImage() != null) user.setImage(req.getImage());
		    if (req.getBackgroundImage() != null) user.setBackgroundImage(req.getBackgroundImage());
		    if (req.getBirthDate() != null) user.setBirthDate(req.getBirthDate());
		    if (req.getLocation() != null) user.setLocation(req.getLocation());
		    if (req.getBio() != null) user.setBio(req.getBio());
		    if (req.getWebsite() != null) user.setWebsite(req.getWebsite());

		    return userRepository.save(user);
	}

	@Override
	public User followUser(Long userId, User user) throws UserException {
		User followToUser =findUserById(userId);
		if(user.getFollowing().contains(followToUser) && followToUser.getFollowers().contains(user)) {
			user.getFollowing().remove(followToUser);
			followToUser.getFollowers().remove(user);
		}
		else {
			user.getFollowing().add(followToUser);
			followToUser.getFollowers().add(user);
		}
		userRepository.save(followToUser);
		userRepository.save(user);
		return followToUser;
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);
	}

}
