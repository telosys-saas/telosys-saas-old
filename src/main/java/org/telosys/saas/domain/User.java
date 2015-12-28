package org.telosys.saas.domain;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable, Comparable<User> {
	
	private static final long serialVersionUID = 12375932534108120L;

	@Override
	public int compareTo(User user2) {
		if(user2 == null) {
			return 1;
		}
		if (this.getLogin() == null) {
			return (user2.getLogin() == null) ? 0 : -1;
		}
		if(user2.getLogin() == null) {
			return 1;
		}
		return this.getLogin().compareTo(user2.getLogin());
	}
	
	private String login;
	private String mail;
	private String passwordEncrypted;
	private String password;
	private String firstname;
	private String lastname;
	private String avatar;
	private Date dateLastConnection;
	
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPasswordEncrypted() {
		return passwordEncrypted;
	}
	public void setPasswordEncrypted(String passwordEncrypted) {
		this.passwordEncrypted = passwordEncrypted;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public Date getDateLastConnection() {
		return dateLastConnection;
	}
	public void setDateLastConnection(Date dateLastConnection) {
		this.dateLastConnection = dateLastConnection;
	}
	
}
