/*
 * Very basic JavaBean cache
 * Created on 11 janv. 2016 ( Date ISO 2016-01-11 - Time 15:26:17 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */

package org.demo.cache;

import java.util.Hashtable;
import java.util.Map;

import org.demo.bean.Author ;

/**
 * Very basic cache for Author instances (just for the Telosys Tools demo)
 * 
 * @author Telosys Tools Generator
 *
 */
public class AuthorCache
{
	private final static Map<String,Author> cache = new Hashtable<String,Author>() ;
	
	/**
	 * Build the cache key from the Primary Key field(s)
	 * @return the key
	 */
	private final static String getKey(  ) {
		return ""  ;
	}

	/**
	 * Put the given Author instance in the cache
	 * @param Author instance to be stored
	 */
	public final static void putAuthor(Author author ) {
		String key = getKey(  ) ;
		cache.put(key, author );
	}
	
	/**
	 * Get the Author instance for the given primary key
	 * @return the Author instance (or null if none)
	 */
	public final static Author getAuthor(  ) {
		String key = getKey(  ) ;
		return cache.get(key);
	}

	/**
	 * Removes the Author associated with the given primary key
	 */
	public final static void removeAuthor (  ) {
		String key = getKey(  ) ;
		cache.remove(key);
	}
	
	/**
	 * Removes the given Author from the cache using its primary key
	 * @param Author instance to be removed
	 */
	public final static void removeAuthor (Author author ) { 
		String key = getKey(  ) ;
		cache.remove(key);
	}

}
