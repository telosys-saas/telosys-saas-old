package org.telosys.saas;

import java.io.File;
import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.websocket.server.ServerContainer;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.handler.gzip.GzipHandler;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;
import org.telosys.saas.security.AuthResource;
import org.telosys.saas.security.Pac4jConfigFactory;
import org.telosys.saas.websocket.TelosysWebSocketHandler;
import org.telosys.saas.websocket.scan.ScanEventHandler;
import org.telosys.saas.websocket.scan.ScanFiles;
import org.telosys.tools.users.UsersManager;

public class TelosysSaasServer {
	
	public static void main(String[] args) throws Exception {
    	TelosysSaasServer server = new TelosysSaasServer();
    	server.start();
    }
	
	public void start() throws Exception {
		
		ScanFiles scanFiles = new ScanFiles("fs", new ScanEventHandler());
		scanFiles.start();
		
		UsersManager.getInstance();
		
		Server server = new Server(8080);
        
		// context rest
		ServletContextHandler contextBack = new ServletContextHandler(ServletContextHandler.SESSIONS);
		contextBack.setContextPath("/api");
		server.setHandler(contextBack);
		
		// websocket
		ServletContextHandler wscontext = new ServletContextHandler(ServletContextHandler.SESSIONS);
        wscontext.setContextPath("/ws");
        server.setHandler(wscontext);
		// Initialize javax.websocket layer
        ServerContainer wscontainer = WebSocketServerContainerInitializer.configureContext(wscontext);
        // Add WebSocket endpoint to javax.websocket layer
        wscontainer.addEndpoint(TelosysWebSocketHandler.class);
		
		// static web
		ResourceHandler resource_handler = new ResourceHandler();
        // Configure the ResourceHandler. Setting the resource base indicates where the files should be served out of.
        // In this example it is the current directory but it can be configured to anything that the jvm has access to.
        resource_handler.setDirectoriesListed(true);
        resource_handler.setWelcomeFiles(new String[]{ "index.html" });
        File web = new File("src/main/resources/META-INF/web");
        if(web.exists()) {
        	resource_handler.setResourceBase("src/main/resources/META-INF/web");
        } else {
        	resource_handler.setResourceBase("jar:file:telosys-saas.jar!/META-INF/web");
        }
 
        // Add the ResourceHandler to the server.
        GzipHandler gzip = new GzipHandler();
        //server.setHandler(gzip);
        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] { wscontext, resource_handler, new DefaultHandler() });
        gzip.setHandler(handlers);

        // Contexts
		HandlerCollection collection = new HandlerCollection();
		collection.addHandler(contextBack);
		collection.addHandler(gzip);
        server.setHandler(collection);

		// pac4j : protected resources
        /*
		FilterHolder protectedFilter = new FilterHolder(new org.pac4j.j2e.filter.RequiresAuthenticationFilter());
		contextBack.addFilter(
				protectedFilter,
				"/*", 
				EnumSet.of(DispatcherType.REQUEST));
		*/
		// DefaultMatchingChecker matchingChecker = new DefaultMatchingChecker();
		// protectedFilter.set
		
        // pac4j : callback
        FilterHolder callbackFilter = new FilterHolder(new org.pac4j.j2e.filter.CallbackFilter());
		callbackFilter.setInitParameter("defaultUrl", "/");
		contextBack.addFilter(
				callbackFilter,
				"/callback", 
				EnumSet.of(DispatcherType.REQUEST));
		
		// pac4j : logout
		FilterHolder logoutFilter = new FilterHolder(new org.pac4j.j2e.filter.ApplicationLogoutFilter());
		logoutFilter.setInitParameter("defaultUrl", "/");
		contextBack.addFilter(
				logoutFilter,
				"/auth/logout", 
				EnumSet.of(DispatcherType.REQUEST));
		
		// pac4j : github
		FilterHolder githubFilter = new FilterHolder(new org.pac4j.j2e.filter.RequiresAuthenticationFilter());
		githubFilter.setInitParameter("configFactory", Pac4jConfigFactory.class.getCanonicalName());
		githubFilter.setInitParameter("clientName", "GitHubClient");
		contextBack.addFilter(
				githubFilter,
				"/auth/github", 
				EnumSet.of(DispatcherType.INCLUDE,DispatcherType.REQUEST));
		
        // pac4j : login form
		FilterHolder formFilter = new FilterHolder(new org.pac4j.j2e.filter.RequiresAuthenticationFilter());
		formFilter.setInitParameter("clientName", "FormClient");
		contextBack.addFilter(
				formFilter,
				"/form/*", 
				EnumSet.of(DispatcherType.REQUEST));
		
		// jersey : /rest
		ServletHolder jerseyRestServlet = contextBack.addServlet(org.glassfish.jersey.servlet.ServletContainer.class, "/v1/*");
		jerseyRestServlet.setInitOrder(1);
		jerseyRestServlet.setInitParameter("jersey.config.server.provider.packages", "org.telosys.saas.rest");
		jerseyRestServlet.setInitParameter("jersey.config.server.provider.classnames", "org.glassfish.jersey.media.multipart.MultiPartFeature");
		
		// jersey : /auth
		ServletHolder jerseyAuthServlet = contextBack.addServlet(org.glassfish.jersey.servlet.ServletContainer.class, "/auth/*");
		jerseyAuthServlet.setInitOrder(2);
		jerseyAuthServlet.setInitParameter("jersey.config.server.provider.classnames", AuthResource.class.getCanonicalName());
		
		try {
			server.start();
			server.join();
		} finally {
			server.destroy();
		}
	}

}
