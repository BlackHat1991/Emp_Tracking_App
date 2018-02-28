# Employee_Track_App

Pre-Requisite:
  npm = 3.10.10
  node = 6.9.3 
  jdk = 1.8
  maven 3
 database: Postgres 9.5.x
 
# Database Set up:
 Execute the following query to get login credential for HR/ADMIN
 
INSERT INTO t_user VALUES (1, '2018-02-27 18:24:34.407', '2018-02-27 18:24:34.407', 'user1@test.com', 'Admin', 'test', '$2a$10$lOl6fTDHIBQ/MaVjjtIQa.tMDQx69H6b3FwVVu39IYyqs4.VKGo8u', 'ADMIN', NULL);

Use email: 'user1@test.com' and Password: 12345 to login

Note: spring-boot jwt security is used so run above query without change.

# Java Code Execution:

Run following Command (Maven Build command)
mvn clean package -DskipTests 

Above command will generate target folder, point target folder to server.

# Angular Build:
1. cd to the directory where you have pull this repository code and run the following commands:
   - "npm install"   //required only once
   - create an empty director under "src" folder by name "meta" 
   - "npm run build:prod"  //this will compile the code
   - "npm run server:prod"    // this will start a http server

