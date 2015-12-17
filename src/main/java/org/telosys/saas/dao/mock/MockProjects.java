package org.telosys.saas.dao.mock;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.Project;

public class MockProjects {
	
	private static List<Project> projects = new ArrayList<>();
	private static Map<String, Folder> filesByProjectId = new HashMap<>();
	
	static {
		projects.add(getProject1());
		projects.add(getProject2());
		filesByProjectId.put("project1", getFilesForProject1());
		filesByProjectId.put("project2", getFilesForProject2());
	}
	
	static Project getProject1() {
		Project project = new Project();
		project.setId("project1");
		project.setName("Project 1");
		return project;
	}

	static Project getProject2() {
		Project project = new Project();
		project.setId("project2");
		project.setName("Project 2");
		return project;
	}
	
	static Folder getFilesForProject1() {
		Folder folder = new Folder();
		folder.setId("project1");
    	folder.setName("Project 1");
    	
    	File file1 = new File();
    	file1.setId("file1txt");
    	file1.setName("file1.txt");
    	file1.setContent("var name = \"file1\"");
    	file1.setFolderId("project1");
    	folder.getFiles().add(file1);
    	File file2 = new File();
    	file2.setId("file2txt");
    	file2.setName("file2.txt");
    	file2.setContent("var name = \"file2\"");
    	file2.setFolderId("project1");
    	folder.getFiles().add(file2);

		return folder;
	}
	
	static Folder getFilesForProject2() {
		Folder folder = new Folder();
		folder.setId("project2");
    	folder.setName("Project 2");
    	
    	File file1 = new File();
    	file1.setId("file1txt");
    	file1.setName("file1.txt");
    	file1.setContent("var name = \"file1\"");
    	file1.setFolderId("project1");
    	folder.getFiles().add(file1);
    	File file2 = new File();
    	file2.setId("file2txt");
    	file2.setName("file2.txt");
    	file2.setContent("var name = \"file2\"");
    	file2.setFolderId("project1");
    	folder.getFiles().add(file2);
    	
    	Folder folder2 = new Folder();
    	folder2.setId("folder2");
    	folder2.setName("Folder 2");
    	folder.getFolders().add(folder2);
    	File file11 = new File();
    	file11.setId("file11txt");
    	file11.setName("file11.txt");
    	file11.setContent("var name = \"file11\"");
    	file11.setFolderId("folder2");
    	folder2.getFiles().add(file11);
    	File file12 = new File();
    	file12.setId("file12txt");
    	file12.setName("file12.txt");
    	file12.setContent("var name = \"file12\"");
    	file12.setFolderId("folder2");
    	folder2.getFiles().add(file12);

		return folder;
	}
	
	static Project getProject(String projectId) {
		for(Project project : projects) {
			if(project.getId().equals(projectId)) {
				return project;
			}
		}
		return null;
	}

	public static List<Project> getProjects() {
		return projects;
	}

	public static void addProject(Project project) {
		String id = project.getName().replaceAll(" ", "").replaceAll("\\.", "").toLowerCase();
		project.setId(id);
		projects.add(project);
	}

	public static void deleteProject(Project projectToDelete) {
		int posToDelete = -1;
		int pos = -1;
		for(Project project : projects) {
			pos++;
			if(project.getId().equals(projectToDelete)) {
				posToDelete = pos;
			}
		}
		if(posToDelete != -1) {
			projects.remove(posToDelete);
		}
	}

	public static Folder getFilesForProject(Project project) {
		return filesByProjectId.get(project.getId());
	}

	public static void setFilesForProject(Project project, Folder rootFolder) {
		filesByProjectId.put(project.getId(), rootFolder);
	}

	public static void addFile(Folder folder, File file) {
		String id = file.getName().replaceAll(" ", "").replaceAll("\\.", "").toLowerCase();
		file.setId(id);
		folder.getFiles().add(file);
	}

	public static void addFolder(Folder folder, Folder folderSub) {
		String id = folderSub.getName().replaceAll(" ", "").replaceAll("\\.", "").toLowerCase();
		folderSub.setId(id);
		folder.getFolders().add(folderSub);
	}

}
