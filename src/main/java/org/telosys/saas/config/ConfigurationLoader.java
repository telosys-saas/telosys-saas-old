package org.telosys.saas.config ;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


/**
 * Configuration Loader
 * 
 * @author Laurent Guerin
 */
class ConfigurationLoader {
		
	private final static String PROPERTIES_FILE_NAME = "telosys-saas.properties" ;
	
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
		Properties properties = loadProperties() ;
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
		String currentDirectory = System.getProperty("user.dir");
		if ( currentDirectory != null ) {
			String fileName = ( currentDirectory.endsWith("/") ? currentDirectory : currentDirectory + "/" ) + PROPERTIES_FILE_NAME ;
			File file = new File(fileName) ;
			if ( file.exists() ) {
				return loadProperties(fileName) ;			
			}
		}
		return null ;
	}
	
	/**
	 * Loads the properties from the file '/META-INF/nanoj.properties'
	 * @return
	 */
	protected Properties loadProperties(String fileName) {
		File file = new File(fileName);
		if ( ! file.exists() ) {
			throw new RuntimeException("File not found '" + fileName + "'" );
		}
		final Properties properties = new Properties();
		try {
			try ( InputStream stream =  new FileInputStream(file); ) {
				properties.load(stream);
			}
		} catch (IOException e) {
			throw new RuntimeException("Cannot load properties from file '" + fileName + "'" );
		}
		return properties;
	}

}
