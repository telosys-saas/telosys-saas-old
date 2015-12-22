package org.telosys.saas.services;

import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.file.FileStorageDao;
import org.telosys.saas.domain.Project;
import org.telosys.tools.api.TelosysProject;
import org.telosys.tools.commons.TelosysToolsException;
import org.telosys.tools.generator.GeneratorException;
import org.telosys.tools.generic.model.Model;

public class ProjectService {
	
	private FileStorageDao storageDao = new FileStorageDao();

	private TelosysProject getTelosysProject(UserProfile user, Project project) {
		String projectFolderAbsolutePath = storageDao.getProjectPath(user, project);
		TelosysProject telosysProject = new TelosysProject(projectFolderAbsolutePath);
		return telosysProject;
	}
	
	public void initProject(UserProfile user, Project project) {
		TelosysProject telosysProject = getTelosysProject(user, project);
		telosysProject.initProject();
	}

	public void launchGeneration(UserProfile user, Project project, String modelName, String bundleName) {
		TelosysProject telosysProject = getTelosysProject(user, project);
		try {
			Model model = telosysProject.loadModel(modelName);
			telosysProject.launchGeneration(model, bundleName);
		} catch (TelosysToolsException e) {
			throw new IllegalStateException(e);
		} catch (GeneratorException e) {
			throw new IllegalStateException(e);
		}
	}
	
}
