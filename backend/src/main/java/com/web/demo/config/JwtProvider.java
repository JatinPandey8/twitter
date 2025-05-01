//package com.web.demo.config;
////
////import java.util.Date;
////import javax.crypto.SecretKey;
////
////import org.springframework.security.core.Authentication;
////import org.springframework.stereotype.Service;
////
////import io.jsonwebtoken.Claims;
////import io.jsonwebtoken.Jwts;
////import io.jsonwebtoken.SignatureAlgorithm;
////import io.jsonwebtoken.security.Keys;
////
////@Service
////public class JwtProvider {
////	 private final SecretKey key;
////
////	    public JwtProvider() {
////	        // Generate a secure key for HMAC SHA-256
////	        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Use HS384 or HS512 if needed
////	    }
//////SecretKey key =Keys.hmacShaKeyFor(JwTConstant.SECRET_KEY.getBytes());
////	// method to generate toke
////	public String generateToken(Authentication auth ) {
////		String  jwt = Jwts.builder().setIssuedAt(new Date())
////		.setExpiration(new Date(new Date().getTime()+86400000 ))
////		.claim("email",auth.getName())
////		.signWith(key)
////		.compact();
////		return jwt;
////		
////	}
////	public String getEmailFromTokenString (String jwt) {
////		jwt =jwt.substring(7);
////		Claims claims =  Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();//when jwt was generated what were the things that we can get out
////		String email = String.valueOf(claims.get("email")); 
////		return email;
////	}
////
////}
//import java.util.Date;
//import javax.crypto.SecretKey;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//
//@Service
//public class JwtProvider {
//    private final SecretKey key;
//
//    public JwtProvider() { 
//        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256); 
//    }
// 
//    public String generateToken(Authentication auth) {
//        Date now = new Date();
//        Date expirationTime = new Date(now.getTime() + 86400000);  // 86400000 ms = 1 day
//        
//        return Jwts.builder()
//                .setIssuedAt(now)
//                .setExpiration(expirationTime)
//                .claim("email", auth.getName())
//                .signWith(key)
//                .compact();
//    }
//
//    public String getEmailFromTokenString(String jwt) {
//        jwt = jwt.substring(7);
//        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//        return String.valueOf(claims.get("email"));
//    }
//}

package com.web.demo.config;

import java.util.Date;
import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    public String generateToken(Authentication auth) {
        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwTConstant.SECRET_KEY));

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("email", userDetails.getUsername())
                .claim("authorities", "ROLE_USER")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }

    public String getEmailFromTokenString(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwTConstant.SECRET_KEY));

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("email").toString();
    }
}

