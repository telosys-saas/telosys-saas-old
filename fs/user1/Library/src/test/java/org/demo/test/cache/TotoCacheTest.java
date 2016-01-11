/*
 * JUnit test case for Toto caching service
 * Created on 11 janv. 2016 ( Date ISO 2016-01-11 - Time 15:26:17 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */

package org.demo.test.cache;


import org.demo.bean.Toto ;
import org.demo.cache.TotoCache ;

import org.junit.Assert;
import org.junit.Test;

/**
 * JUnit test case for Toto caching service
 * 
 * @author Telosys Tools Generator
 *
 */
public class TotoCacheTest 
{
	protected static final java.util.Date now = new java.util.Date();

	private final static void populate(Toto toto) {
		toto.setId( "A" ) ;
	}

	@Test
	public void testPutGetRemove() {
		
		System.out.println("Testing class TotoCache ..." );
		
		Toto toto = new Toto();
		populate(toto);
		System.out.println("Entity populated : " + toto );
		
		TotoCache.putToto(toto) ;	// Store in cache	
		
		Toto toto2 = TotoCache.getToto(  );
		Assert.assertTrue( toto == toto2 ) ; // Same instance
		
		TotoCache.removeToto(   ) ; // Remove from cache	
		
		Toto toto3 = TotoCache.getToto(  );
		Assert.assertTrue( null == toto3 ) ; // Not in cache
		
	}
}
