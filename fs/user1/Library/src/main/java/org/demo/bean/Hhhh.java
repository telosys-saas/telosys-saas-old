/*
 * Java bean class for entity table  
 * Created on 11 janv. 2016 ( Date ISO 2016-01-11 - Time 15:26:17 )
 * Generated by Telosys Tools Generator ( version 3.0.0 )
 */

package org.demo.bean;

import java.io.Serializable;


/**
 * Entity bean for table ""
 * 
 * @author Telosys Tools Generator
 *
 */
public class Hhhh implements Serializable
{
    private static final long serialVersionUID = 1L;


    private String     myfield      ;

    /**
     * Default constructor
     */
    public Hhhh()
    {
        super();
    }
    
    //----------------------------------------------------------------------
    // GETTER(S) & SETTER(S) FOR THE PRIMARY KEY 
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // GETTER(S) & SETTER(S) FOR DATA FIELDS
    //----------------------------------------------------------------------
    //--- DATABASE MAPPING :  (  ) 
    /**
     * Set the "myfield" field value
     * This field is mapped on the database column "" ( type "", NotNull : false ) 
     * @param myfield
     */
    public void setMyfield( String myfield )
    {
        this.myfield = myfield;
    }
    /**
     * Get the "myfield" field value
     * This field is mapped on the database column "" ( type "", NotNull : false ) 
     * @return the field value
     */
    public String getMyfield()
    {
        return this.myfield;
    }


    //----------------------------------------------------------------------
    // toString METHOD
    //----------------------------------------------------------------------
    public String toString() { 
        StringBuffer sb = new StringBuffer(); 
        sb.append(myfield);
        return sb.toString(); 
    } 


}
