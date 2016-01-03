package org.demo.bean;

public class Employee implements Serializable {

	private Date birthDate;
	private String firstName;
	private Integer names;
	private Integer id;

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Integer getNames() {
		return names;
	}

	public void setNames(Integer names) {
		this.names = names;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
