package com.web.demo.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JwTConstant.JWT_HEADER);

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);

            try {
            	SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwTConstant.SECRET_KEY));

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                String email = claims.getSubject(); // if you used setSubject()
                String authorities = String.valueOf(claims.get("authorities"));

                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (ExpiredJwtException e) {
                throw new BadCredentialsException("Expired token");
            } catch (io.jsonwebtoken.MalformedJwtException e) {
                throw new BadCredentialsException("Malformed token");
            } catch (io.jsonwebtoken.SignatureException e) {
                throw new BadCredentialsException("Invalid signature");
            } catch (IllegalArgumentException e) {
                throw new BadCredentialsException("Token is null or empty");
            } catch (Exception e) {
                e.printStackTrace();
                throw new BadCredentialsException("Invalid token");
            }
        }

        filterChain.doFilter(request, response);
    }
}


//
//import java.io.IOException;
//
//import java.util.*;
//
//import javax.crypto.SecretKey;
//import javax.swing.JComboBox.KeySelectionManager;
//
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.authority.GrantedAuthoritiesContainer;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//
//import jakarta.servlet.Filter;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.ServletRequest;
//import jakarta.servlet.ServletResponse;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
////
////public class JwTokenValidator extends OncePerRequestFilter {
////
////	@Override
////	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
////			throws ServletException, IOException {
////		String  jwt= request.getHeader(JwTConstant.JWT_HEADER)		;
////		//BEARERE AND ACTUAL JWT TOKER
////		if(jwt!=null) { // to check if it is jwt token and above 7 length (cos of bearerer)
////			jwt=jwt.substring(7);
////			try {
////				SecretKey key =Keys.hmacShaKeyFor(JwTConstant.SECRET_KEY.getBytes());
////				Claims claims =  Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();//when jwt was generated what were the things that we can get out
////				String email = String.valueOf(claims.get("email")); // if my jwt token gets validate or not
////				String authorities = String.valueOf(claims.get("authorities"));
////				List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities); //application where role matter and he want sto pass authority
////				Authentication authentication = new UsernamePasswordAuthenticationToken(email, null,auths);
////				SecurityContextHolder.getContext().setAuthentication(authentication);
////			
////			}catch (Exception e) {
////				  throw new BadCredentialsException("invalid token");
////		    }
////			
////		}
////		filterChain.doFilter(request, response);// next step after jwt gets validated
////	
////
////	}
////
////}
//
//public class JwtTokenValidator extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//      //  SecretKey key = Keys.hmacShaKeyFor(JwTConstant.SECRET_KEY.getBytes());
//
////        String jwt = request.getHeader(JwTConstant.JWT_HEADER); // e.g. "Bearer eyJhbGciOiJIUzI1NiIsInR..."
////        String jwt = Jwts.builder() 
////        		.claim("authorities", "ROLE_USER")
////        	    .setIssuedAt(new Date())
////        	    .setExpiration(new Date(System.currentTimeMillis() + 86400000))
////        	    .signWith(Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwTConstant.SECRET_KEY)))
////        	    .compact();
//        String jwt = request.getHeader(JwTConstant.JWT_HEADER);
//
//        System.out.println("Incoming JWT: " + jwt);
// 
//        System.out.println("KEY (length=" + JwTConstant.SECRET_KEY.length() + "): " + JwTConstant.SECRET_KEY);
//
//
//        if (jwt != null && jwt.startsWith("Bearer ")) {
//            jwt = jwt.substring(7); // Strip the "Bearer " prefix
//
//            try {
//               SecretKey key = Keys.hmacShaKeyFor(JwTConstant.SECRET_KEY.getBytes());
//                System.out.println("SECRET_KEY bytes: " + Arrays.toString(JwTConstant.SECRET_KEY.getBytes()));
//                // Parse claims
//                Claims claims = Jwts.parserBuilder()
//                        .setSigningKey(key)
//                        .build()
//                        .parseClaimsJws(jwt)
//                        .getBody();
//
//                String email = claims.getSubject(); // or claims.get("email") if you stored it under "email"
//                String authorities = String.valueOf(claims.get("authorities"));
//
//                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
//
//                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//                System.out.println("SECRET_KEY bytes: " + Arrays.toString(JwTConstant.SECRET_KEY.getBytes()));
//
//            } catch (ExpiredJwtException e) {
//                throw new BadCredentialsException("Expired token");
//            } catch (io.jsonwebtoken.MalformedJwtException e) {
//                throw new BadCredentialsException("Malformed token");
//            } catch (io.jsonwebtoken.SignatureException e) {
//                throw new BadCredentialsException("Invalid signature");
//            } catch (IllegalArgumentException e) {
//                throw new BadCredentialsException("Token is null or empty");
//            } catch (Exception e) {
//                e.printStackTrace(); // This will show the exact issue in logs
//                throw new BadCredentialsException("Invalid token");
//            }
//            System.out.println("Incoming JWT: " + jwt);
//
//        }
//
//        filterChain.doFilter(request, response); // Proceed regardless (either token set context or not)
//    }
//}