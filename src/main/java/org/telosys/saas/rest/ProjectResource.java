package org.telosys.saas.rest;

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

import org.pac4j.core.context.J2EContext;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.profile.UserProfile;
import org.telosys.saas.dao.StorageDao;
import org.telosys.saas.dao.file.FileStorageDao;
import org.telosys.saas.domain.File;
import org.telosys.saas.domain.Folder;
import org.telosys.saas.domain.Project;

@Path("/users/{userId}/projects/{projectId}")
public class ProjectResource {

	// private StorageDao storage = new MockStorageDao();
	private StorageDao storage = new FileStorageDao();
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
    	if(folder == null) {
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
    	if(folder == null) {
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
    	if(file == null) {
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
