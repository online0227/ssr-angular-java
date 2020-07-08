# ssr-angular-java
How to run backend Java Spring Boot:
1. Configure any necessary settings at backend/target/classes/application.properties
2. Create a database by running:

	create database ssr_angular_java;
	
3. Turn on command line, go to backend directory
4. Run it by "mvn spring-boot:run" and turn off, it will initialize your mysql database.
5. Add following into your mysql database:

	INSERT INTO ssr_angular_java.roles(name) VALUES('ROLE_USER');
	INSERT INTO ssr_angular_java.roles(name) VALUES('ROLE_ADMIN');
	
6. Run the app again

How to run frontend Angular:
1. Turn on command line, go to frontend directory
2. Run it by "npm run dev:ssr"
