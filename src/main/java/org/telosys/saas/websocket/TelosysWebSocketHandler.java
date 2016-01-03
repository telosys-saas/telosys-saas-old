package org.telosys.saas.websocket;

import java.io.IOException;

import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.telosys.saas.websocket.scan.ScanSessionStore;

@ServerEndpoint("/users/{userId}/projects/{projectId}")
public class TelosysWebSocketHandler
{
	
	private ScanSessionStore scanSessionStore = ScanSessionStore.getInstance();
	
	@OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        // System.out.println("Close: statusCode=" + statusCode + ", reason=" + reason);
		scanSessionStore.removeClosedSessions();
    }

    @OnWebSocketError
    public void onError(Throwable t) {
        // System.out.println("Error: " + t.getMessage());
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam("userId") String userId, @PathParam("projectId") String projectName) {
        System.out.println("Connect: " + session.getUserPrincipal() + ", session:"+session + ", config: "+config.getUserProperties());
        //String socketId = upgradeRequest.getHeader("Sec-WebSocket-Key");
        scanSessionStore.addSession(session);
        scanSessionStore.addFolderForSession(session, "fs/"+userId+"/"+projectName);
        try {
        	final RemoteEndpoint.Basic remote = session.getBasicRemote();
            remote.sendText("Session : " + session);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnMessage
    public void onMessage(Session session, @PathParam("userId") String userId, @PathParam("projectId") String projectName, String message) {
        // System.out.println("Message: " + message);
    }
    
}
