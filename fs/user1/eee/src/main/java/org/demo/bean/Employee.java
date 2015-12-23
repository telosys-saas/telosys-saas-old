package org.demo.bean;

public class Employee implements Serializable {

    @Column(name="")
    private Date       birthDate    ;
    @Column(name="")
    private String     firstName    ;
    @Column(name="")
    private Integer    id           ;

    public Employee() {
		super();
    }
    


}
