package org.telosys.saas.dao.file;

import java.io.FileFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileDeleteStrategy;
import org.apache.commons.io.filefilter.FileFilterUtils;
import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.StorageDao;
import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.Project;
import org.telosys.saas.util.FileUtil;

public class FileStorageDao implements StorageDao {

	private String getRootPath() {
		return "fs";
	}
	
	private java.io.File getRootDir() {
		return new java.io.File(getRootPath());
	}

	private String getUserPath(UserProfile user) {
		return FileUtil.join(getRootPath(), user.getId());
	}
	
	private java.io.File getUserDir(UserProfile user) {
		String path = getUserPath(user);
		return new java.io.File(path);
	}

	public String getProjectPath(UserProfile user, Project project) {
		return FileUtil.join(getRootPath(), user.getId(), project.getId());
	}
	
	private java.io.File getProjectDir(UserProfile user, Project project) {
		String path = getProjectPath(user, project);
		return new java.io.File(path);
	}

	private Project getProjectForDirectory(UserProfile user, java.io.File fileIO) {
		Project project = new Project();
		project.setId(fileIO.getName());
		project.setName(fileIO.getName());
		return project;
	}
	
	@Override
	public Project getProjectForUser(UserProfile user, String projectId) {
		Project project = new Project();
		project.setId(projectId);
		
		java.io.File projectDir = getProjectDir(user, project);
		if(!projectDir.exists()) {
			return null;
		}
		
		return getProjectForDirectory(user, projectDir);
	}

	@Override
	public List<Project> getProjectsForUser(UserProfile user) {
		java.io.File userDir = getUserDir(user);
		
		List<Project> projects = new ArrayList<Project>();
		
		FileFilter fileFilter = FileFilterUtils.directoryFileFilter();
		for(java.io.File file : userDir.listFiles(fileFilter)) {
			Project project = getProjectForDirectory(user, file);
			projects.add(project);
		}
		
		return projects;
	}

	@Override
	public void createProjectForUser(UserProfile user, Project project) {
		java.io.File projectDir = getProjectDir(user, project);
		if(!projectDir.exists()) {
			projectDir.mkdirs();
		}
	}

	@Override
	public void deleteProjectForUser(UserProfile user, Project project) {
		java.io.File projectDir = getProjectDir(user, project);
		if(projectDir.exists()) {
			projectDir.delete();
		}

	}

	@Override
	public Folder getFilesForProjectAndUser(UserProfile user, Project project) {
		java.io.File projectDir = getProjectDir(user, project);
		if(!projectDir.exists()) {
			throw new IllegalStateException("Project directory does not exist : "+projectDir.getPath());
		}
		return getRootFolderForProjectDir(projectDir, "");
	}

	private Folder getRootFolderForProjectDir(java.io.File projectDir, String relativePath) {
		String folderRelativePath = FileUtil.join(relativePath, projectDir.getName());
		Folder folder = new Folder();
		folder.setId("");
		folder.setName(projectDir.getName());
		folder.setFolderParentId("");
		
		folder.getFolders().addAll(getFoldersFromDirectory(projectDir, folderRelativePath));
		folder.getFiles().addAll(getFilesFromDirectory(projectDir, folderRelativePath));

		return folder;
	}
	
	private Folder getFolderForDir(java.io.File folderDir, String relativePath) {
		String folderRelativePath = FileUtil.join(relativePath, folderDir.getName());
		Folder folder = new Folder();
		folder.setId(folderRelativePath);
		folder.setName(folderDir.getName());
		folder.setFolderParentId(relativePath);
		
		folder.getFolders().addAll(getFoldersFromDirectory(folderDir, folderRelativePath));
		folder.getFiles().addAll(getFilesFromDirectory(folderDir, folderRelativePath));
		
		return folder;
	}
	
	private List<Folder> getFoldersFromDirectory(java.io.File directory, String relativePath) {
		List<Folder> folders = new ArrayList<>();
		FileFilter directoryFilter = FileFilterUtils.directoryFileFilter();
		for(java.io.File file : directory.listFiles(directoryFilter)) {
			Folder folderSub = getFolderForDir(file, relativePath);
			folders.add(folderSub);
		}
		return folders;
	}

	private List<File> getFilesFromDirectory(java.io.File directory, String relativePath) {
		List<File> files = new ArrayList<>();
		FileFilter fileFilter = FileFilterUtils.fileFileFilter();
		for(java.io.File file : directory.listFiles(fileFilter)) {
			File fileSub = getFile(file, relativePath);
			files.add(fileSub);
		}
		return files;
	}
	
	private File getFile(java.io.File fileIO, String relativePath) {
		String fileRelativePath = FileUtil.join(relativePath, fileIO.getName());
		File file = new File();
		file.setId(fileRelativePath);
		file.setName(fileIO.getName());
		file.setFolderParentId(relativePath);
		return file;
	}

	@Override
	public Folder getFolderForProjectAndUser(UserProfile user, Project project, String folderId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public File getFileForProjectAndUser(UserProfile user, Project project, String fileId) {
		String projectPath = getUserPath(user);
		String filePath = FileUtil.join(projectPath, fileId);
		String relativePath = FileUtil.dirname(fileId);
		java.io.File fileIO = new java.io.File(filePath);
		File file = getFile(fileIO, relativePath);
		
		if(fileIO.exists()) {
			try {
				file.setContent(FileUtil.readFile(filePath));
			} catch (IOException e) {
				throw new IllegalStateException(e);
			}
		}
		
		return file;
	}

	@Override
	public void createFileForProjectAndUser(UserProfile user, Project project, File file) {
		saveFileForProjectAndUser(user, project, file);
	}

	@Override
	public void createFolderForProjectAndUser(UserProfile user, Project project, Folder folderSub) {
		String projectPath = getProjectPath(user, project);
		String filePath = FileUtil.join(projectPath, folderSub.getId());
		java.io.File fileIO = new java.io.File(filePath);
		fileIO.mkdirs();
	}

	@Override
	public void saveFileForProjectAndUser(UserProfile user, Project project, File fileToSave) {
		String projectPath = getProjectPath(user, project);
		String filePath = FileUtil.join(projectPath, fileToSave.getId());
		try {
			FileUtil.writeFile(filePath, fileToSave.getContent());
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	@Override
	public void saveFolderForProjectAndUser(UserProfile user, Project project, Folder folderToSave) {

	}

	@Override
	public void deleteFileForProjectAndUser(UserProfile user, Project project, File fileToDelete) {
		String projectPath = getProjectPath(user, project);
		String filePath = FileUtil.join(projectPath, fileToDelete.getId());
		java.io.File fileIO = new java.io.File(filePath);
		fileIO.setWritable(true);
		if(!fileIO.delete()) {
			try {
				FileDeleteStrategy.FORCE.delete(fileIO);
			} catch (IOException e) {
				throw new IllegalStateException("File can not be deleted : "+filePath);
			}
		}
	}

	@Override
	public void deleteFolderForProjectAndUser(UserProfile user, Project project, Folder folderToDelete) {
		String projectPath = getProjectPath(user, project);
		String filePath = FileUtil.join(projectPath, folderToDelete.getId());
		java.io.File fileIO = new java.io.File(filePath);
		if(fileIO.exists()) {
			fileIO.delete();
		}
	}

}
