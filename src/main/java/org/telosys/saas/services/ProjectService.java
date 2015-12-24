package org.telosys.saas.services;

import java.util.HashMap;
import java.util.Map;

import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.file.FileStorageDao;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.GenerationErrorResult;
import org.telosys.saas.domain.GenerationResult;
import org.telosys.saas.domain.Project;
import org.telosys.saas.domain.ProjectConfiguration;
import org.telosys.saas.domain.ProjectConfigurationVariables;
import org.telosys.saas.util.FileUtil;
import org.telosys.tools.api.TelosysProject;
import org.telosys.tools.commons.TelosysToolsException;
import org.telosys.tools.commons.cfg.TelosysToolsCfg;
import org.telosys.tools.commons.variables.Variable;
import org.telosys.tools.generator.GeneratorException;
import org.telosys.tools.generator.task.ErrorReport;
import org.telosys.tools.generator.task.GenerationTaskResult;
import org.telosys.tools.generic.model.Model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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

	public ProjectConfiguration getProjectConfiguration(UserProfile user, Project project) {
		try {
			TelosysProject telosysProject = getTelosysProject(user, project);
			TelosysToolsCfg telosysToolsCfg = telosysProject.loadTelosysToolsCfg();
		
			ProjectConfiguration projectConfiguration = new ProjectConfiguration();
			ProjectConfigurationVariables projectVariables = projectConfiguration.getVariables();
			
			projectVariables.setSRC(telosysToolsCfg.getSRC());
			projectVariables.setTEST_SRC(telosysToolsCfg.getTEST_SRC());
			projectVariables.setRES(telosysToolsCfg.getRES());
			projectVariables.setTEST_RES(telosysToolsCfg.getTEST_RES());
			projectVariables.setWEB(telosysToolsCfg.getWEB());
			projectVariables.setDOC(telosysToolsCfg.getDOC());
			projectVariables.setTMP(telosysToolsCfg.getTMP());
			projectVariables.setROOT_PKG(telosysToolsCfg.getRootPackage());
			projectVariables.setENTITY_PKG(telosysToolsCfg.getEntityPackage());
			
			Map<String, String> specificVariables = new HashMap<String, String>();
			for(Variable variable : telosysToolsCfg.getSpecificVariables()) {
				specificVariables.put(variable.getName(), variable.getValue());
			}
			String specificVariablesAsJson = new ObjectMapper().writeValueAsString(specificVariables);
			projectConfiguration.getVariables().setSpecificVariables(specificVariablesAsJson);
			
			return projectConfiguration;
		} catch (TelosysToolsException e) {
			throw new IllegalStateException(e);
		} catch (JsonProcessingException e) {
			throw new IllegalStateException(e);
		}
	}

	public void saveProjectConfiguration(UserProfile user, Project project, ProjectConfiguration projectConfiguration) {
		try {
			TelosysProject telosysProject = getTelosysProject(user, project);
			TelosysToolsCfg telosysToolsCfg = telosysProject.loadTelosysToolsCfg();
		
			ProjectConfigurationVariables projectVariables = projectConfiguration.getVariables();
			
			telosysToolsCfg.setSRC(projectVariables.getSRC());
			telosysToolsCfg.setTEST_SRC(projectVariables.getTEST_SRC());
			telosysToolsCfg.setRES(projectVariables.getRES());
			telosysToolsCfg.setTEST_RES(projectVariables.getTEST_RES());
			telosysToolsCfg.setWEB(projectVariables.getWEB());
			telosysToolsCfg.setDOC(projectVariables.getDOC());
			telosysToolsCfg.setTMP(projectVariables.getTMP());
			telosysToolsCfg.setRootPackage(projectVariables.getROOT_PKG());
			telosysToolsCfg.setEntityPackage(projectVariables.getENTITY_PKG());
			
			/*
			Map<Object, Object> specificVariables = new ObjectMapper().convertValue(projectVariables.getSpecificVariables(), HashMap.class);
			List<Variable> variables = new ArrayList<Variable>();
			for(Object key : specificVariables.keySet()) {
				String name = (String) key;
				String value = String.valueOf(specificVariables.get(key));
				Variable variable = new Variable(name, value);
				variables.add(variable);
			}
			telosysToolsCfg.setSpecificVariables(variables);
			*/
			
			telosysProject.saveTelosysToolsCfg(telosysToolsCfg);
		} catch (TelosysToolsException e) {
			throw new IllegalStateException(e);
		}
	}
	
}
