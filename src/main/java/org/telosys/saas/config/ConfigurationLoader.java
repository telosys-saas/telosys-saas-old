package org.telosys.saas.config ;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.telosys.saas.security.FormAuthenticator;


/**
 * Configuration Loader
 * 
 * @author Laurent Guerin
 */
class ConfigurationLoader {
	
	protected static final Logger logger = LoggerFactory.getLogger(FormAuthenticator.class);
	
	private final static String PROPERTIES_FILE_NAME = "telosys-saas.properties";
	
	/**
	 * Constructor
	 */
	protected ConfigurationLoader() {
		super();
	}
	
	/**
	 * Loads the configuration from the file 'telosys-saas.properties' <br>
	 * located in the current directory. Or return the default configuration is file not found<br>
	 * 
	 * @return
	 */
	public Configuration loadConfiguration() {
		Properties properties = loadProperties();
		if ( properties != null ) {
			return new Configuration(properties);
		}
		else {
			return new Configuration();
		}
	}
	
	/**
	 * Try to load properties from the file 'telosys-saas.properties' located in the current dir <br>
	 * 
	 * @return
	 */
	protected Properties loadProperties() {
		InputStream in = this.getClass().getClassLoader().getResourceAsStream(PROPERTIES_FILE_NAME);
		final Properties properties = new Properties();
		try {
			properties.load(in);
		} catch (IOException e) {
			logger.error("Error during properties loading",e);
			throw new RuntimeException(e);
		}
		return properties;
	}
	
}
