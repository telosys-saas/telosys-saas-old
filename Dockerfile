FROM ubuntu:14.04
MAINTAINER TelosysTeam <telosysteam@gmail.com>

RUN apt-get -y update

# install python-software-properties (so you can do add-apt-repository)
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q python-software-properties software-properties-common

# install oracle java from PPA
RUN add-apt-repository ppa:webupd8team/java -y
RUN apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get -y install oracle-java8-installer && apt-get clean

# Set oracle java as the default java
RUN update-java-alternatives -s java-8-oracle
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

EXPOSE 8080

VOLUME ["/fs"]

ADD target/telosys-saas.jar /telosys-saas.jar

CMD java -jar /telosys-saas.jar