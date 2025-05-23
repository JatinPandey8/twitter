package com.web.demo.service;
import java.util.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.web.demo.model.User;
import com.web.demo.repository.UserRepository;

@Service
public class CustomUserDetailsServiceImplementation implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
 User user =userRepository.findByEmail(username);
 if(user==null || user.isLogin_with_google()) {
	 throw new UsernameNotFoundException("Username not found with email" + username);
 }
 List<GrantedAuthority> authorities = new ArrayList<>();

 
		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	}

}
