package com.web.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.demo.config.JwtProvider;
import com.web.demo.exception.UserException;
import com.web.demo.model.User;
import com.web.demo.model.Verifications;
import com.web.demo.repository.UserRepository;
import com.web.demo.response.AuthResponse;
import com.web.demo.service.CustomUserDetailsServiceImplementation;

@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://twitter-hazel-rho.vercel.app",
    "https://twitter-jatinpandey8s-projects.vercel.app"
})
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserRepository  userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private  CustomUserDetailsServiceImplementation customerUserDetails;
	// to create new user
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
	
		
		String email = user.getEmail();
		String password=user.getPassword();
		String fullName= user.getFullName();
		String birthDate = user.getBirthDate();
	
		User isEmailExist =userRepository.findByEmail(email);
		if(isEmailExist != null) {
			throw new UserException("Email  is alread in use");
		}
		
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setBirthDate(birthDate);
		createdUser.setVerification(new Verifications());


		User savedUser = userRepository.save(createdUser);
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtProvider.generateToken(authentication);
		AuthResponse  res = new AuthResponse(token,true); 
		
return new ResponseEntity<AuthResponse>(res,HttpStatus.OK);		
	}
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody User user){
		String username =user.getEmail();
		String password =user.getPassword();
		Authentication authentication = authenticate(username,password);
		String token = jwtProvider.generateToken(authentication);
		AuthResponse  res = new AuthResponse(token,true); 
		
return new ResponseEntity<AuthResponse>(res,HttpStatus.OK);
	}
	
	
	
		//  to check if email exist in database and then to check pass
	//if match then return authenicate and don't then exception
		private Authentication authenticate(String username, String password) {
			UserDetails userDetails =customerUserDetails.loadUserByUsername(username);
			// in customuserdetailsserviceimp... we created user details which loads user name if theres any username present
			// if it is then ok or not then will throw an exception
			if(userDetails==null) {// if  null then user details have not loaded
				throw new BadCredentialsException("Invalid username");
			}
			
			if (!passwordEncoder.matches(password,userDetails.getPassword())) {
				throw new BadCredentialsException("Invalid username or Password");
				
			}
		return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
	}
		
	
}
