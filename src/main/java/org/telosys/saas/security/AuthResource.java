package org.telosys.saas.security;

import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.pac4j.core.context.J2EContext;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.profile.UserProfile;

@Path("/")
public class AuthResource {
	
    @GET
    @Path("status")
    @Produces(MediaType.TEXT_PLAIN)
    public String status(@Context HttpServletRequest request, @Context HttpServletResponse response) {
    	J2EContext context = new J2EContext(request, response);
        ProfileManager manager = new ProfileManager(context);
        HttpSession session = request.getSession();
        UserProfile profile = manager.get(true);
        if(profile == null) {
        	return "{\"authenticated\":false}";
        } else {
        	return "{\"authenticated\":" + (profile != null) + ", \"userId\": \""+profile.getId()+"\"}";
        }
    }

    @GET
    @Path("github")
    @Produces(MediaType.TEXT_PLAIN)
    public Response github(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		try {
	    	URI targetURIForRedirection = new URI("/");
	        return Response.temporaryRedirect(targetURIForRedirection).build();
		} catch (URISyntaxException e) {
			throw new RuntimeException(e);
		}
    }
}
