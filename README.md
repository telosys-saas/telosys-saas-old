# Telosys Saas

## Install & Run

* Download:

 * ```git clone https://github.com/telosys-saas/telosys-saas.git```
* Go to the project folder:
 * ```cd telosys-saas```
* Build:
 * ```cd telosys-saas```
 * ```mvn clean package```
* Run:
 * ```java -jar target/telosys-saas.jar```
=> Console output : ```[main] INFO org.eclipse.jetty.server.Server - Started```
* Go to the URL :
 * [http://localhost:8080](http://localhost:8080)

## Development configuration

### Java Back-end

* In your IDE:
 * Import the project as a Maven Project
 * Run the main class : ```org.telosys.saas.TelosysSaasServer```

### Front-end

* Install the latest version of node.js
* Install webpack
 * ```npm install webpack -g```
* Go to the folder webdevof the project telosys-saas:
 * ```cd webdev```
* Initialize :
 * ```npm install```
* Build HTML & JS files in the ouput directory web and watch for modifications :
 * ```webpack --config webpack-production.config.js --progress --colors --watch```
 
