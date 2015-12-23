package org.telosys.saas.services;

import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.file.FileStorageDao;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.GenerationErrorResult;
import org.telosys.saas.domain.GenerationResult;
import org.telosys.saas.domain.Project;
import org.telosys.saas.util.FileUtil;
import org.telosys.tools.api.TelosysProject;
import org.telosys.tools.commons.TelosysToolsException;
import org.telosys.tools.generator.GeneratorException;
import org.telosys.tools.generator.task.ErrorReport;
import org.telosys.tools.generator.task.GenerationTaskResult;
import org.telosys.tools.generic.model.Model;

public class ProjectService {
	
	private FileStorageDao storageDao = new FileStorageDao();

	public TelosysProject getTelosysProject(UserProfile user, Project project) {
		String projectFolderAbsolutePath = storageDao.getProjectPath(user, project);
		TelosysProject telosysProject = new TelosysProject(projectFolderAbsolutePath);
		return telosysProject;
	}
	
	public void initProject(UserProfile user, Project project) {
		TelosysProject telosysProject = getTelosysProject(user, project);
		telosysProject.initProject();
	}

	public GenerationResult launchGeneration(UserProfile user, Project project, String modelName, String bundleName) {
		TelosysProject telosysProject = getTelosysProject(user, project);
		try {
			Model model = telosysProject.loadModel(modelName);
			GenerationTaskResult generationTaskResult = telosysProject.launchGeneration(model, bundleName);
			
			GenerationResult generationResult = new GenerationResult();
			generationResult.setNumberOfFilesGenerated(generationTaskResult.getNumberOfFilesGenerated());
			generationResult.setNumberOfGenerationErrors(generationTaskResult.getNumberOfGenerationErrors());
			generationResult.setNumberOfResourcesCopied(generationTaskResult.getNumberOfResourcesCopied());
			for(ErrorReport errorReport : generationTaskResult.getErrors()) {
				GenerationErrorResult error = new GenerationErrorResult();
				error.setException(errorReport.getException());
				error.setErrorType(errorReport.getErrorType());
				error.setMessage(errorReport.getMessage());
				generationResult.getErrors().add(error);
			}
			return generationResult;
		} catch (TelosysToolsException e) {
			throw new IllegalStateException(e);
		} catch (GeneratorException e) {
			throw new IllegalStateException(e);
		}
	}

	public void addBundleToTheProject(UserProfile user, Project project, String bundleName) {
		TelosysProject telosysProject = getTelosysProject(user, project);
		try {
			telosysProject.downloadAndInstallBundle("telosys-tools", bundleName);
		} catch (TelosysToolsException e) {
			throw new IllegalStateException(e);
		}
	}

	public void removeBundleFromTheProject(UserProfile user, Project project, String bundleName) {
		String folderTemplatesPath = FileUtil.join("TelosysTools","templates",bundleName);
    	Folder folderBundle = storageDao.getFolderForProjectAndUser(user, project, folderTemplatesPath);
    	storageDao.deleteFolderForProjectAndUser(user, project, folderBundle);
	}
	
}
