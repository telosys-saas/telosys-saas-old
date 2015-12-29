package org.telosys.saas.security.user;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

import org.telosys.saas.domain.User;
import org.telosys.saas.util.Util;

public class UsersFileDao {
	
	protected static final String USERS_FILENAME = "fs/users.csv";
	
	protected final File getUsersFile() {
		return new File(USERS_FILENAME);
	}
	
	public synchronized Set<User> loadAllUsers() {
		Set<User> users = new TreeSet<>();
		
		File file = getUsersFile();
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				throw new IllegalStateException("Create Users file", e);
			}
		}
		
		try(BufferedReader br = new BufferedReader(new FileReader(file))) { 
	        StringBuilder sb = new StringBuilder();
	        String line;

	        while ((line = br.readLine()) != null) {
	            User user = this.convertStringToUser(line);
	            if(user != null) {
	            	users.add(user);
	            }
	        }
	        
		    return users;
	    } catch (IOException e) {
			throw new IllegalStateException("Read Users file", e);
		}
	}
	
	public synchronized void saveAllUsers(Set<User> users) {
		File file = getUsersFile();
		
		// if file doesnt exists, then create it
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				throw new IllegalStateException("Create Users file", e);
			}
		}

		try(FileWriter fw = new FileWriter(file.getAbsoluteFile())) {
			BufferedWriter bw = new BufferedWriter(fw);
			for(User user : users) {
				String content = convertUserToString(user);
				bw.write(content);
				bw.write("\n");
			}
			bw.close();
		} catch (IOException e) {
			throw new IllegalStateException("Write Users file", e);
		}
	}
	
	protected User convertStringToUser(String line) {
		if(line == null || "".equals(line.trim())) {
			return null;
		}
		if(line.charAt(0) == '#') {
			return null;
		}
		String[] splits = Util.splitWithNullIfEmpty(line, ';');
		User user = new User();
		int pos = 0;
		user.setLogin(splits[pos]);
		pos++;
		user.setPasswordEncrypted(splits[pos]);
		pos++;
		user.setMail(splits[pos]);
		pos++;
		user.setFirstname(splits[pos]);
		pos++;
		user.setLastname(splits[pos]);
		pos++;
		user.setAvatar(splits[pos]);
		pos++;
		user.setDateLastConnection(convertStringToDate(splits[pos]));
		return user;
	}
	
	protected String convertUserToString(User user) {
		StringBuffer buf = new StringBuffer();
		append(buf, user.getLogin());
		buf.append(";");
		append(buf, user.getPasswordEncrypted());
		buf.append(";");
		append(buf, user.getMail());
		buf.append(";");
		append(buf, user.getFirstname());
		buf.append(";");
		append(buf, user.getLastname());
		buf.append(";");
		append(buf, user.getAvatar());
		buf.append(";");
		append(buf, user.getDateLastConnection());
		buf.append(";");
		return buf.toString();
	}
	
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY");
	
	protected Date convertStringToDate(String dateAsString) {
		if(dateAsString == null || "".equals(dateAsString.trim())) {
			return null;
		}
		try {
			return sdf.parse(dateAsString);
		} catch (ParseException e) {
			return null;
		}
	}
	
	protected String convertDateToString(Date date) {
		return sdf.format(date);
	}
	
	protected void append(StringBuffer buf, String str) {
		if(str == null || "".equals(str.trim())) {
			return;
		}
		buf.append(str.trim());
	}

	protected void append(StringBuffer buf, Date date) {
		if(date == null) {
			return;
		}
		buf.append(convertDateToString(date));
	}
	
}
