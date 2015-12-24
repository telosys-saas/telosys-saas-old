package org.telosys.saas.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.pac4j.core.context.J2EContext;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.StorageDao;
import org.telosys.saas.dao.file.FileStorageDao;
import org.telosys.saas.domain.Bundle;
import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.GenerationResult;
import org.telosys.saas.domain.Project;
import org.telosys.saas.domain.ProjectConfiguration;
import org.telosys.saas.services.BundleService;
import org.telosys.saas.services.ProjectService;

@Path("/users/{userId}/projects/{projectId}")
public class ProjectResource {

	// private StorageDao storage = new MockStorageDao();
	private StorageDao storage = new FileStorageDao();
	private BundleService bundleService = new BundleService();
	private ProjectService projectService = new ProjectService();
	@Context
	private HttpServletRequest request;
	@Context
	private HttpServletResponse response;
	
	private UserProfile getUser() {
		J2EContext context = new J2EContext(request, response);
        ProfileManager manager = new ProfileManager(context);
        HttpSession session = request.getSession();
        UserProfile profile = manager.get(true);
        return profile;
	}

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Project getProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	return project;
    }

    @GET
    @Path("/zip")
    @Produces("application/zip")
    public Response downloadZipProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	java.io.File file = storage.getFileZipToDownload(user, project);
    	return Response.ok(file).header("Content-Disposition", "attachment; filename=\""+projectId+".zip\"").build();
    }

    @GET
    @Path("/configuration")
    @Produces(MediaType.APPLICATION_JSON)
    public ProjectConfiguration getProjectConfiguration(@PathParam("userId") String userId, @PathParam("projectId") String projectId) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	ProjectConfiguration projectConfiguration = projectService.getProjectConfiguration(user, project);
    	return projectConfiguration;
    }

    @PUT
    @Path("/configuration")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ProjectConfiguration saveProjectConfiguration(@PathParam("userId") String userId, @PathParam("projectId") String projectId, ProjectConfiguration projectConfiguration) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	projectService.saveProjectConfiguration(user, project, projectConfiguration);
    	return projectConfiguration;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Project saveProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId, Project project) {
    	UserProfile user = getUser();
    	Project projectExisting = storage.getProjectForUser(user, project.getId());
    	if(projectExisting == null) {
    		// Create
    		storage.createProjectForUser(user, project);
    		// Init
    		projectService.initProject(user, project);
    		return project;
    	}
    	return project;
    }

    @Path("/model/{modelName}/bundle/{bundleName}/action/generate")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public GenerationResult launchGeneration(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("modelName") String modelName, @PathParam("bundleName") String bundleName) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	return projectService.launchGeneration(user, project, modelName, bundleName);
    }

    @Path("/bundles")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Bundle> getBundlesOfProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	return bundleService.getBundlesOfProject(user, project);
    }

    @Path("/bundles/{bundleName}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public void addBundleToTheProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("bundleName") String bundleName) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	projectService.addBundleToTheProject(user, project, bundleName);
    }

    @Path("/bundles/{bundleName}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public void removeBundleFromTheProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("bundleName") String bundleName) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	projectService.removeBundleFromTheProject(user, project, bundleName);
    }

	/**
	 * Get root folder with all sub folders and all files of the project of the authenticated user
	 * @param projectId Project id
	 * @return Root folder
	 */
    @Path("/workspace")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Folder getWorkspace(@PathParam("userId") String userId, @PathParam("projectId") String projectId) {
    	UserProfile user = getUser(); 
    	Project project = storage.getProjectForUser(user, projectId);
    	return storage.getFilesForProjectAndUser(user, project);
    }

    @Path("/folders/{folderId}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Folder saveFolder(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("folderId") String folderId, Folder folderToSave) {
    	UserProfile user = getUser(); 
    	Project project = storage.getProjectForUser(user, projectId);
    	Folder folder = storage.getFolderForProjectAndUser(user, project, folderId);
    	if(!folder.isExisting()) {
    		// Create
        	storage.createFolderForProjectAndUser(user, project, folderToSave);
    	} else {
    		// Update
        	storage.saveFolderForProjectAndUser(user, project, folderToSave);
    	}
    	return folderToSave;
    }

    @Path("/folders/{folderId}")
    @DELETE
    public void deleteFolder(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("folderId") String folderId) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	Folder folder = storage.getFolderForProjectAndUser(user, project, folderId);
    	if(!folder.isExisting()) {
    		throw new IllegalStateException("Folder does not exists : "+folderId);
    	}
    	storage.deleteFolderForProjectAndUser(user, project, folder);
    }
	
    @Path("/files/{fileId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public File getFile(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("folderId") String folderId, @PathParam("fileId") String fileId) {
    	UserProfile user = getUser(); 
    	Project project = storage.getProjectForUser(user, projectId);
    	return storage.getFileForProjectAndUser(user, project, fileId);
    }

    @Path("/files/{fileId}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void saveFile(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("fileId") String fileId, File fileToSave) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	File file = storage.getFileForProjectAndUser(user, project, fileId);
    	if(!file.isExisting()) {
    		// Create
        	storage.createFileForProjectAndUser(user, project, fileToSave);
    	} else {
    		// Update
    		storage.saveFileForProjectAndUser(user, project, fileToSave);
    	}
    }

    @Path("/files/{fileId}")
    @DELETE
    public void deleteFile(@PathParam("userId") String userId, @PathParam("projectId") String projectId, @PathParam("fileId") String fileId) {
    	UserProfile user = getUser();
    	Project project = storage.getProjectForUser(user, projectId);
    	File file = storage.getFileForProjectAndUser(user, project, fileId);
    	if(file == null) {
    		throw new IllegalStateException("File does not exists : "+fileId);
    	}
    	storage.deleteFileForProjectAndUser(user, project, file);
    }
	
}
