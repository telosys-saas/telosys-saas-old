package org.telosys.saas.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telosys.saas.config.Configuration;
import org.telosys.saas.config.ConfigurationHolder;
import org.telosys.saas.security.FormAuthenticator;
import org.telosys.tools.users.UsersManager;

/**
 * Application initialization.
 */
public class InitServletContextListener implements ServletContextListener {

	protected static final Logger logger = LoggerFactory.getLogger(FormAuthenticator.class);

	/**
	 * Initialization
	 */
	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		logger.info("Initialization");
		logger.info("Load configuration");
		Configuration configuration = ConfigurationHolder.getConfiguration();
		String dataRootPath = configuration.getDataRootPath();
		String usersFilePath = dataRootPath + "/users.csv";
		logger.info("Users file : "+usersFilePath);
		UsersManager.setUsersFileName(usersFilePath);
	}

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		
	}
	
}
