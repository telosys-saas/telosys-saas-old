package org.telosys.saas.services;

import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.file.FileStorageDao;
import org.telosys.saas.domain.Project;
import org.telosys.tools.api.TelosysProject;

public class ProjectService {
	
	private FileStorageDao storageDao = new FileStorageDao();
	
	public void initProject(UserProfile user, Project project) {
		String projectFolderAbsolutePath = storageDao.getProjectPath(user, project);
		TelosysProject telosysProject = new TelosysProject(projectFolderAbsolutePath);
		telosysProject.initProject();
	}
	
}
