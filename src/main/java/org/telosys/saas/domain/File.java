package org.telosys.saas.domain;

import java.io.Serializable;

public class File implements Serializable {

	private static final long serialVersionUID = 1717762719485741897L;

	private String id;
	
	private String folderId;
	
	private String name;
	
	private String content = "";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFolderId() {
		return folderId;
	}

	public void setFolderId(String folderId) {
		this.folderId = folderId;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
