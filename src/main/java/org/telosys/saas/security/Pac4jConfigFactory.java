package org.telosys.saas.security;

import java.util.ArrayList;
import java.util.List;

import org.pac4j.core.client.Client;
import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.core.config.ConfigFactory;
import org.pac4j.http.client.indirect.FormClient;
import org.pac4j.http.credentials.authenticator.test.SimpleTestUsernamePasswordAuthenticator;
import org.pac4j.oauth.client.GitHubClient;
import org.telosys.saas.config.Configuration;
import org.telosys.saas.config.ConfigurationHolder;

public class Pac4jConfigFactory implements ConfigFactory {
    @Override
    public Config build() {        
    	Configuration configuration = ConfigurationHolder.getConfiguration();
    	
    	List<Client> clients = new ArrayList<>();
    	
    	// Github
    	if(configuration.getGithubOauthKey() != null && configuration.getGthubOauthPassword() != null) {
    		GitHubClient gitHubClient = new GitHubClient(
    				configuration.getGithubOauthKey(), configuration.getGthubOauthPassword());
    		gitHubClient.setScope("user:email");
    		clients.add(gitHubClient);
    	}
        
    	// User / Password form
        FormClient formClient = new FormClient("/", new FormAuthenticator());
        clients.add(formClient);
        
        return new Config(new Clients(configuration.getAuthRedirectUrl(), clients.toArray(new Client[] {})));
    }
}