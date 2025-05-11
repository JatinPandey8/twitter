package com.web.demo.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.hibernate.mapping.Collection;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class Appconfig {
	
	  private final JwtTokenValidator jwtTokenValidator;

	    public Appconfig(JwtTokenValidator jwtTokenValidator) {
	        this.jwtTokenValidator = jwtTokenValidator;
	    }
	@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
	http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	.and().authorizeHttpRequests(auth -> auth
		    .requestMatchers("/auth/**").authenticated()
		    .requestMatchers("/api/**").permitAll()
		    .anyRequest().permitAll()
		)
.addFilterBefore( jwtTokenValidator, BasicAuthenticationFilter.class)
	.csrf().disable()
	.cors().configurationSource(corsConfigurationSource());

	
	return http.build();
}

private CorsConfigurationSource corsConfigurationSource() {
	
	return new CorsConfigurationSource() {
		
		@Override
		public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
CorsConfiguration cfg = new CorsConfiguration();
cfg.setAllowedOrigins(List.of("https://twitter-hazel-rho.vercel.app"));
cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
cfg.setAllowedHeaders(List.of("*"));
cfg.setAllowCredentials(true);
cfg.setExposedHeaders(List.of("Authorization"));
cfg.setMaxAge(3600L);
return cfg;
 		}
	};
}
@Bean
public PasswordEncoder passwordEncoder() { //after entering pass first it wll get encryptthe pass
	//even if hacker hack, he will only recievve decrypt password
	return new BCryptPasswordEncoder();
}



}
