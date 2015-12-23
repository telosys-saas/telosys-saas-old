package org.telosys.saas.dao.mock;

import java.util.List;

import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.StorageDao;
import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.Project;

public class MockStorageDao implements StorageDao {

	@Override
	public Project getProjectForUser(UserProfile user, String projectId) {
		return MockProjects.getProject(projectId);
	}

	@Override
	public List<Project> getProjectsForUser(UserProfile user) {
		return MockProjects.getProjects();
	}

	@Override
	public void createProjectForUser(UserProfile user, Project project) {
		MockProjects.addProject(project);
	}

	@Override
	public void deleteProjectForUser(UserProfile user, Project project) {
		MockProjects.deleteProject(project);
	}

	@Override
	public Folder getFilesForProjectAndUser(UserProfile user, Project project) {
		return MockProjects.getFilesForProject(project);
	}

	@Override
	public File getFileForProjectAndUser(UserProfile user, Project project, String fileId) {
		Folder rootFolder = MockProjects.getFilesForProject(project);
		return findFileInFolder(rootFolder, fileId);
	}
	
	private File findFileInFolder(Folder folder, String fileId) {
		for(File file : folder.getFiles()) {
			if(file.getId().equals(fileId)) {
				return file;
			}
		}
		for(Folder folderSub : folder.getFolders()) {
			File fileFound = findFileInFolder(folderSub, fileId);
			if(fileFound != null) {
				return fileFound;
			}
		}
		return null;
	}

	@Override
	public Folder getFolderForProjectAndUser(UserProfile user, Project project, String fileId) {
		Folder rootFolder = MockProjects.getFilesForProject(project);
		return findFolderInFolder(rootFolder, fileId);
	}
	
	private Folder findFolderInFolder(Folder folder, String folderId) {
		if(folder.getId().equals(folderId)) {
			return folder;
		}
		for(Folder folderSub : folder.getFolders()) {
			Folder folderFound = findFolderInFolder(folderSub, folderId);
			if(folderFound != null) {
				return folderFound;
			}
		}
		return null;
	}

	@Override
	public void createFileForProjectAndUser(UserProfile user, Project project, File file) {
		Folder folder = getFolderForProjectAndUser(user, project, file.getFolderParentId());
		MockProjects.addFile(folder, file);
	}
	
	@Override
	public void createFolderForProjectAndUser(UserProfile user, Project project, Folder folderSub) {
		Folder folder = getFolderForProjectAndUser(user, project, folderSub.getFolderParentId());
		MockProjects.addFolder(folder, folderSub);
	}
	
	@Override
	public void saveFileForProjectAndUser(UserProfile user, Project project, File fileToSave) {
		File file = getFileForProjectAndUser(user, project, fileToSave.getId());
		//file.setName(fileToSave.getName());
		file.setContent(fileToSave.getContent());
	}

	@Override
	public void saveFolderForProjectAndUser(UserProfile user, Project project, Folder folderToSave) {
		Folder folder = getFolderForProjectAndUser(user, project, folderToSave.getId());
		//folder.setName(folderToSave.getName());
	}

	@Override
	public void deleteFileForProjectAndUser(UserProfile user, Project project, File fileToDelete) {
		File file = getFileForProjectAndUser(user, project, fileToDelete.getId());
		Folder folderParent = getFolderForProjectAndUser(user, project, file.getFolderParentId());
		MockProjects.deleteFile(folderParent, file);
	}

	@Override
	public void deleteFolderForProjectAndUser(UserProfile user, Project project, Folder folderToDelete) {
		Folder folder = getFolderForProjectAndUser(user, project, folderToDelete.getId());
		Folder folderParent = getFolderForProjectAndUser(user, project, folder.getFolderParentId());
		MockProjects.deleteFolder(folderParent, folder);
	}

	@Override
	public java.io.File getFileZipToDownload(UserProfile user, Project project) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
