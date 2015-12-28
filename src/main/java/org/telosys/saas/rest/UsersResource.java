package org.telosys.saas.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.pac4j.core.context.J2EContext;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.domain.User;
import org.telosys.saas.security.user.UsersManager;
import org.telosys.saas.util.Util;

@Path("/users")
public class UsersResource {

	private UsersManager usersManager = UsersManager.getInstance();
	
	@Context
	private HttpServletRequest request;
	@Context
	private HttpServletResponse response;
	
	private UserProfile getUser() {
		J2EContext context = new J2EContext(request, response);
        ProfileManager manager = new ProfileManager(context);
        HttpSession session = request.getSession();
        UserProfile profile = manager.get(true);
        return profile;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User saveUser(User user) {
		if(Util.isEmpty(user.getLogin())) {
			throw new IllegalStateException("create user : login is not defined");
		}
		User userExisting = usersManager.getUserByLogin(user.getLogin());
		if(userExisting != null) {
			throw new IllegalStateException("create user : user already exists");
		}
		usersManager.addUser(user);
		return user;
	}

	@Path("{login}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User saveUser(@PathParam("login") String login, User user) {
		if(!Util.equalsAndNotEmpty(user.getLogin(), login)) {
			throw new IllegalStateException("save user : logins are not the same");
		}
		UserProfile authenticatedUser = getUser();
		if(!Util.equalsAndNotEmpty(authenticatedUser.getId(), login)) {
			throw new IllegalStateException("save user : not authorized");
		}
		UsersManager.getInstance().addUser(user);
		return user;
	}

	@Path("{login}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("login") String login) {
		UserProfile authenticatedUser = getUser();
		if(!Util.equalsAndNotEmpty(authenticatedUser.getId(), login)) {
			throw new IllegalStateException("save user : not authorized");
		}
		return UsersManager.getInstance().getUserByLogin(login);
	}
	
}
