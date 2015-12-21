package org.telosys.saas.dao.file;

import org.junit.Test;
import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.Project;

public class FileStorageDaoTest {
	
	@Test
	public void createSaveDelete() {
		
		FileStorageDao fs = new FileStorageDao();
		
		// User
		UserProfile user = new UserProfile();
		user.setId("user1");
		// Project
		Project project = new Project();
		project.setId("project_test");
		// Folder
		Folder folder = new Folder();
		folder.setId("folder1");
		// File
		File file = new File();
		file.setId("folder1/test.txt");
		file.setContent("Test1");
		
		// Create project, folder and file
		fs.createProjectForUser(user, project);
		fs.createFolderForProjectAndUser(user, project, folder);
		fs.createFileForProjectAndUser(user, project, file);
		
		// Update file
		file.setContent("Test2");
		fs.saveFileForProjectAndUser(user, project, file);
		
		// Delete file, folder and project
		fs.deleteFileForProjectAndUser(user, project, file);
		fs.deleteFolderForProjectAndUser(user, project, folder);
		fs.deleteProjectForUser(user, project);
	}
	
}
