package com.medicationtracker.auth.payload;

import java.util.List;
import lombok.Data;

@Data
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private String name;
	private List<String> roles;

	public JwtResponse(String accessToken, Long id, String username, String email, String name, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.name = name;
		this.roles = roles;
	}
}
