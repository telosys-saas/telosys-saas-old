package org.telosys.saas.security.user;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.telosys.saas.domain.User;

public class UsersManager {
	
	private static final UsersManager instance;
	
	static {
		instance = new UsersManager();
		instance.loadAllUsers();
	}
	
	private UsersManager() {}
	
	public static UsersManager getInstance() {
		return instance;
	}
	
	private UsersFileDao usersFileDao = new UsersFileDao(); 
	
	private Set<User> users = new HashSet<User>();
	private Map<String, User> usersByLogin = new HashMap<>();
	
	public User getUserByLogin(String login) {
		return usersByLogin.get(login);
	}

	public synchronized void loadAllUsers() {
		this.users = usersFileDao.loadAllUsers();
		this.usersByLogin = new HashMap<>();
		for(User user : users) {
			usersByLogin.put(user.getLogin(), user);
		}
	}
	
	public synchronized void addUser(User user) {
		if(user.getLogin() == null || "".equals(user.getLogin().trim())) {
			throw new IllegalStateException("User login is not defined");
		}
		users.remove(user);
		users.add(user);
		usersByLogin.put(user.getLogin(), user);
		usersFileDao.saveAllUsers(users);
		loadAllUsers();
	}
	
}
