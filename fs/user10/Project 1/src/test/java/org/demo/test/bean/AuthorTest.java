/*
 * JUnit test case for bean Author
 * Created on 2 mars 2016 ( Date ISO 2016-03-02 - Time 16:02:32 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */

package org.demo.test.bean;


import java.math.BigDecimal;

import org.demo.bean.Author ;

import org.junit.Assert;
import org.junit.Test;

/**
 * JUnit test case for bean Author
 * 
 * @author Telosys Tools Generator
 *
 */
public class AuthorTest 
{
	protected static final byte    byteValue    = 1 ;
	protected static final short   shortValue   = 1 ;
	protected static final int     intValue     = 1 ;
	protected static final int     integerValue = 1 ;
	protected static final long    longValue    = 1 ;
	
	protected static final float   floatValue    = 1.234f ;
	protected static final double  doubleValue   = 1.234 ;
	
	protected static final BigDecimal bigdecimalValue = new BigDecimal("12.3456");
	
	protected static final String  stringValue  = "A" ;
	
	protected static final java.util.Date     dateValue         = new java.util.Date();
	protected static final java.sql.Date      sqldateValue      = new java.sql.Date(dateValue.getTime());
	protected static final java.sql.Time      sqltimeValue      = new java.sql.Time(dateValue.getTime());
	protected static final java.sql.Timestamp sqltimestampValue = new java.sql.Timestamp(dateValue.getTime());

	protected static final byte[]  bytesArray  = "ABCD".getBytes() ;

	@Test
	public void testSettersAndGetters() {
		
		System.out.println("Checking class Author getters and setters ..." );
		
		Author author = new Author();
		
		//--- Test setter/getter for field "myfield"  ( type : String )
		// System.out.println(" checking field myfield ..." );
		author.setMyfield( stringValue ) ;
		Assert.assertTrue( stringValue.equals( author.getMyfield() ) ) ;

		
	}



}
