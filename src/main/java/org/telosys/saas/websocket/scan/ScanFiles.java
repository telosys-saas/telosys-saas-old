package org.telosys.saas.websocket.scan;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

public class ScanFiles extends Thread {
	
	private final String rootDir;
	private final ScanEventHandler scanEventHandler;
	
	public ScanFiles(String rootDir, ScanEventHandler scanEventHandler) {
		this.rootDir = rootDir;
		this.scanEventHandler = scanEventHandler;
	}
	
	@Override
	public void run() {
		// scan(this.rootDir, this.scanEventHandler);
		Path path = new File(rootDir).toPath();
		try {
			WatchDir watchDir = new WatchDir(path, scanEventHandler, true);
			watchDir.processEvents();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
	
}
