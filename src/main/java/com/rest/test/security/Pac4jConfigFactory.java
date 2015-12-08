package com.rest.test.security;

import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.core.config.ConfigFactory;
import org.pac4j.http.client.indirect.FormClient;
import org.pac4j.http.credentials.authenticator.test.SimpleTestUsernamePasswordAuthenticator;
import org.pac4j.oauth.client.GitHubClient;

public class Pac4jConfigFactory implements ConfigFactory {
    @Override
    public Config build() {        

        GitHubClient gitHubClient = new GitHubClient("1eb1481f8f91399ab1cb", "7f5fa49c20844702c082d3a10d9d2dcac27fe4cb");
        gitHubClient.setScope("user:email");
        
        FormClient formClient = new FormClient("http://localhost:8080/login.html", new SimpleTestUsernamePasswordAuthenticator());
        
        Clients clients =
                new Clients("http://localhost:8080/api/callback",
                	formClient,
                    gitHubClient
                );
        final Config config = new Config(clients);
        return config;
    }
}