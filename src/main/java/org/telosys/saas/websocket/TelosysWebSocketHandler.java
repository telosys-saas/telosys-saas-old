package org.telosys.saas.websocket;

import java.io.IOException;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.UpgradeRequest;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.telosys.saas.websocket.scan.ScanSessionStore;

@WebSocket
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

    @OnWebSocketConnect
    public void onConnect(Session session) {
        System.out.println("Connect: " + session.getRemoteAddress().getAddress() + ", session:"+session);
        UpgradeRequest upgradeRequest = session.getUpgradeRequest();
        //String socketId = upgradeRequest.getHeader("Sec-WebSocket-Key");
        scanSessionStore.addSession(session);
        scanSessionStore.addFolderForSession(session, "fs/user1/eee");
        try {
            session.getRemote().sendString("Session : " + session);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnWebSocketMessage
    public void onMessage(String message) {
        // System.out.println("Message: " + message);
    }
    
}
