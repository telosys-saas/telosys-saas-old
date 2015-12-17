package org.telosys.saas.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Folder implements Serializable {

	private static final long serialVersionUID = 4039077010346149928L;

	private String id;
	
	private String name;
	
	private List<File> files = new ArrayList<>();
	
	private List<Folder> folders = new ArrayList<>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<File> getFiles() {
		return files;
	}

	public void setFiles(List<File> files) {
		this.files = files;
	}

	public List<Folder> getFolders() {
		return folders;
	}

	public void setFolders(List<Folder> folders) {
		this.folders = folders;
	}
	
}
