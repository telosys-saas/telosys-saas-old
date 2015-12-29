package org.telosys.saas.util.encrypted;

public class PasswordEncoder {
	
	public String encrypt(String originalPassword) {
		return BCrypt.hashpw(originalPassword, BCrypt.gensalt(12));
	}
	
	public boolean verify(String originalPassword, String encryptedPassword) {
		return BCrypt.checkpw(originalPassword, encryptedPassword);
	}
	
}
