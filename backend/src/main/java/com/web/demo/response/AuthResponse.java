package com.web.demo.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
// @AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	private String token;
	private  boolean status;
	public AuthResponse(String token, boolean status) {
		this.token = token;
        this.status = status;	}
	
	 public String getToken() {
	        return token;
	    }

	    public boolean isStatus() {
	        return status;
	    }

}
