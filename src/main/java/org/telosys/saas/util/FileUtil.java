package org.telosys.saas.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileUtil {
	
	public static String join(String... dirs) {
		StringBuffer path = new StringBuffer();
		
		for(String dir : dirs) {
			String formattedDir = dir;
			if(path.length() > 0) {
				if(formattedDir.length() > 0 && formattedDir.charAt(0) == File.separatorChar) {
					formattedDir = formattedDir.substring(1);
				}
			}
			if(formattedDir.length() > 0 && formattedDir.charAt(formattedDir.length() - 1) == File.separatorChar) {
				formattedDir = formattedDir.substring(0, formattedDir.length() - 1);
			}
			if(formattedDir.length() > 0) {
				if(path.length() > 0) {
					path.append(File.separator);
				}
				path.append(formattedDir);
			}
		}
		
		return path.toString();
	}
	
	public static String dirname(String path) {
		if(Util.isEmpty(path)) {
			return path;
		}
		
		path = path.trim();
		
		if(path.indexOf(File.separator) == -1) {
			return "";
		} else {
			return path.substring(0, path.lastIndexOf(File.separator));
		}
	}
	
	public static String readFile( String file ) throws IOException {
		FileReader fileReader = null;
		BufferedReader reader = null;
	    try {
	    	fileReader = new FileReader(file);
	    	reader = new BufferedReader(fileReader);
		    String         line = null;
		    StringBuilder  stringBuilder = new StringBuilder();
		    String         ls = System.getProperty("line.separator");
	
		    while( ( line = reader.readLine() ) != null ) {
		        stringBuilder.append( line );
		        stringBuilder.append( ls );
		    }
	
		    return stringBuilder.toString();
	    }
	    finally {
	    	if(fileReader != null) {
	    		fileReader.close();
	    	}
	    	if(reader != null) {
	    		reader.close();
	    	}
	    }
	}
	
	public static void writeFile( String filePath, String content ) throws IOException {
		java.io.File file = new java.io.File(filePath);
		
		// if file doesnt exists, then create it
		if (!file.exists()) {
			file.createNewFile();
		}

		FileWriter fw = new FileWriter(file.getAbsoluteFile());
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(content);
		bw.close();
	}
		
	
}
