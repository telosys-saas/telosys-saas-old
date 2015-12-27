package org.telosys.saas.websocket.scan;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.eclipse.jetty.websocket.api.Session;

public class ScanSessionStore {
	
	private static final ScanSessionStore instance = new ScanSessionStore();
	
	private ScanSessionStore() {
	}
	
	public static ScanSessionStore getInstance() {
		return instance;
	}
	
	private Set<Session> sessions = new HashSet<>();
	private Map<String, Set<Session>> sessionsByFolders = new HashMap<>();
	private Map<Session, Set<String>> foldersBySessions = new HashMap<>();

	public void addSession(Session session) {
		sessions.add(session);
	}
	
	public void addFolderForSession(Session session, String folder) {
		Set<String> folders = foldersBySessions.get(session);
		if(folders == null) {
			folders = new HashSet<String>();
			foldersBySessions.put(session, folders);
		}
		folders.add(folder);
		
		Set<Session> sessions = sessionsByFolders.get(folder);
		if(sessions == null) {
			sessions = new HashSet<Session>();
			sessionsByFolders.put(folder, sessions);
		}
		sessions.add(session);
	}
	
	public void removeSession(Session session) {
		for(String folder : foldersBySessions.get(session)) {
			Set<Session> sessions = sessionsByFolders.get(folder);
			sessions.remove(session);
		}
		foldersBySessions.remove(session);
		this.sessions.remove(session);
	}
	
	public Set<Session> getSessionsForFolder(String folder) {
		return sessionsByFolders.get(folder);
	}

	public synchronized void removeClosedSessions() {
		for(Session session : this.sessions) {
			if(!session.isOpen()) {
				this.removeSession(session);
			}
		}
	}
	
}
