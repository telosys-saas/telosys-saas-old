package org.telosys.saas.config ;

import java.util.Properties;

import org.bouncycastle.crypto.RuntimeCryptoException;

/**
 * Telosys SaaS Configuration ( SINGLE INSTANCE )
 * 
 * @author Laurent Guerin
 */
public class Configuration {

	//--- Parameters names
	private static final String DATA_ROOT_PATH    = "dataRootPath" ;
	private static final String HTTP_PORT         = "httpPort" ;

	//--- Default values
	private static final String DATA_ROOT_PATH_DEFAULT_VALUE  = "fs" ;
	private static final String HTTP_PORT_DEFAULT_VALUE       = "80" ;
	
	//--- Attributes
	private final String dataRootPath ; 

	private final String httpPort ; 
	
	//--------------------------------------------------------------------------------
	/**
	 * Constructor <br>
	 * Build the configuration with the default values
	 * @param properties
	 */
	protected Configuration() {
		
		this.dataRootPath = DATA_ROOT_PATH_DEFAULT_VALUE ;
		this.httpPort     = HTTP_PORT_DEFAULT_VALUE ;
	}
	
	//--------------------------------------------------------------------------------
	/**
	 * Constructor <br>
	 * Build the configuration from the given properties
	 * @param properties
	 */
	protected Configuration(Properties properties) {
		
		this.dataRootPath = paramValue( properties.getProperty(DATA_ROOT_PATH), DATA_ROOT_PATH_DEFAULT_VALUE) ;
		this.httpPort     = paramValue( properties.getProperty(HTTP_PORT),      HTTP_PORT_DEFAULT_VALUE);
	}
	
	//--------------------------------------------------------------------------------
	/**
	 * Returns the trimmed parameter value or the given default value if null or void
	 * @param paramValue
	 * @param defaultValue
	 * @return
	 */
	private String paramValue(String paramValue, String defaultValue) {
		if ( paramValue != null ) {
			String paramValue2 = paramValue.trim() ;
			if ( paramValue2.length() > 0 ) {
				return paramValue2 ;
			}
		}
		return defaultValue ;
	}
	//--------------------------------------------------------------------------------
	public String getDataRootPath() {
		return dataRootPath;
	}
	public String getHttpPort() {
		return httpPort;
	}
	public int getHttpPortAsInt() {
		try {
			return Integer.parseInt(httpPort);
		} catch (NumberFormatException e) {
			throw new RuntimeException("Configuration error, cannot convert http port '"+httpPort+"' to int");
		}
	}

}
