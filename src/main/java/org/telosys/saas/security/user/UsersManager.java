package org.telosys.saas.security.user;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.telosys.saas.domain.User;
import org.telosys.saas.util.encrypted.PasswordEncoder;

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
    private PasswordEncoder passwordEncoder = new PasswordEncoder();

	private Set<User> users = new HashSet<User>();
	private Map<String, User> usersByLogin = new HashMap<>();
	
	public User getUserByLogin(String login) {
		synchronized (this.usersByLogin) {
			return usersByLogin.get(login);
		}
	}

	public synchronized void loadAllUsers() {
		this.users = usersFileDao.loadAllUsers();
		synchronized (usersByLogin) {
			this.usersByLogin.clear();
			for(User user : users) {
				usersByLogin.put(user.getLogin(), user);
			}
		}
	}
	
	public synchronized void addUser(User user) {
		if(user.getLogin() == null || "".equals(user.getLogin().trim())) {
			throw new IllegalStateException("User login is not defined");
		}

		if(user.getPassword() != null) {
			String passwordEncrypted = passwordEncoder.encrypt(user.getPassword());
			user.setPasswordEncrypted(passwordEncrypted);
			user.setPassword(null);
		}
		
		users.remove(user);
		users.add(user);
		usersByLogin.put(user.getLogin(), user);
		usersFileDao.saveAllUsers(users);
		loadAllUsers();
	}
	
}
