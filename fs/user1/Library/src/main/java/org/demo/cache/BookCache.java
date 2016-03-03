/*
 * Very basic JavaBean cache
 * Created on 12 janv. 2016 ( Date ISO 2016-01-12 - Time 09:59:46 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */

package org.demo.cache;

import java.util.Hashtable;
import java.util.Map;

import org.demo.bean.Book ;

/**
 * Very basic cache for Book instances (just for the Telosys Tools demo)
 * 
 * @author Telosys Tools Generator
 *
 */
public class BookCache
{
	private final static Map<String,Book> cache = new Hashtable<String,Book>() ;
	
	/**
	 * Build the cache key from the Primary Key field(s)
	 * @return the key
	 */
	private final static String getKey(  ) {
		return ""  ;
	}

	/**
	 * Put the given Book instance in the cache
	 * @param Book instance to be stored
	 */
	public final static void putBook(Book book ) {
		String key = getKey(  ) ;
		cache.put(key, book );
	}
	
	/**
	 * Get the Book instance for the given primary key
	 * @return the Book instance (or null if none)
	 */
	public final static Book getBook(  ) {
		String key = getKey(  ) ;
		return cache.get(key);
	}

	/**
	 * Removes the Book associated with the given primary key
	 */
	public final static void removeBook (  ) {
		String key = getKey(  ) ;
		cache.remove(key);
	}
	
	/**
	 * Removes the given Book from the cache using its primary key
	 * @param Book instance to be removed
	 */
	public final static void removeBook (Book book ) { 
		String key = getKey(  ) ;
		cache.remove(key);
	}

}