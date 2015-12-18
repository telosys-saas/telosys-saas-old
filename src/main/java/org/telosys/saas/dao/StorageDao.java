package org.telosys.saas.dao;

import java.util.List;

import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.Project;

public interface StorageDao {

	/**
	 * Get project for user.
	 */
	Project getProjectForUser(UserProfile user, String projectName);
	
	/**
	 * Get projects for user.
	 */
	List<Project> getProjectsForUser(UserProfile user);
	
	/**
	 * Create project for user.
	 */
	void createProjectForUser(UserProfile user, Project project);

	/**
	 * Delete project for user.
	 */
	void deleteProjectForUser(UserProfile user, Project project);
	
	/**
	 * Get files for the project of the user.
	 */
	Folder getFilesForProjectAndUser(UserProfile user, Project project);

	/**
	 * Get folder for the project of the user.
	 */
	Folder getFolderForProjectAndUser(UserProfile user, Project project, String fileId);
	
	/**
	 * Get file for the project of the user.
	 */
	File getFileForProjectAndUser(UserProfile user, Project project, String fileId);
	
	/**
	 * Create file in the folder for the project of the user.
	 */
	void createFileForProjectAndUser(UserProfile user, Project project, String folderId, File file);

	/**
	 * Create folder in the folder for the project of the user.
	 */
	void createFolderForProjectAndUser(UserProfile user, Project project, String folderId, Folder folderSub);

	/**
	 * Save the file for the project of the user.
	 * @param user
	 * @param project
	 * @param fileToSave
	 */
	void saveFileForProjectAndUser(UserProfile user, Project project, File fileToSave);

	/**
	 * Save the folder for the project of the user.
	 * @param user
	 * @param project
	 * @param folderToSave
	 */
	void saveFolderForProjectAndUser(UserProfile user, Project project, Folder folderToSave);

	/**
	 * Delete file for the project of the user.
	 * @param user
	 * @param project
	 * @param fileToDelete
	 */
	void deleteFileForProjectAndUser(UserProfile user, Project project, File fileToDelete);

	/**
	 * Delete folder for the project of the user.
	 * @param user
	 * @param project
	 * @param folderToDelete
	 */
	void deleteFolderForProjectAndUser(UserProfile user, Project project, Folder folderToDelete);
	
}
