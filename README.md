# Calvin- Communities 


## Overview

Calvin- Communities repository has all the backend APIs for 'Calvin- Practitioners Platform' along with Angular based Front-End for Admin Panel.

The Backend API code & Front-End UI code is in [server] & [webapp] directories respectively.

also, most of the tasks are implemented as micro-services. 
for which you need a certain level of infrastructure to run, which are viz;

## Prerequisites

### Git
- You can find documentation and download git [here][git-home].
- After Downloading, clone this repository with 'git clone https://github.com/stackroute/calvin-communities'.
- after cloning, move to branch [dev-wave-18] with 'git checkout -b dev-wave-18'

### Node.js and Tools

- Get [Node.js][node].
- Install the tool dependencies: `npm install`

### Docker
- You can download required docker & docker-compose versions from [here](https://www.docker.com),  according to your host system OS.


# Steps to Dockerize this app

## step-0 Building angular code

- Before Dockerizing the App, we need to build the angular code for admin panel with this command  'npm run build'

## step-1 dockerizing the app

-  To Dockerize this app including all the services, use command 'docker-compose up' (prefix 'sudo', if required). it will do the following for you :

1. Copy all the code.
2. Install all the dependencies.
3. Copy Angular Build we did in step 0.
4. Run 'www' (Backend Code) on port 3000.
5. Run 'Cassandra DB' on port 9042.
6. Run 'ZooKeeper' on port 2181.
7. Run 'Kafka' on port 9092.
8. Run 'Redis' on port 6379.
9. Run 'Notifications' service.
10. Run 'Counter Manager' service.
11. Run 'Member Reverse Lookup' service.
12. Run 'Tools Reverse Lookup' service.
13. Run 'ToolSink' Service.

For Smooth working of your dockerized app, keep above mentioned ports free on your Host Machine 
OR
Change the ports for the services in 'docker-compose.yml' as per your need.

# Prerequisites for running all Micro Services Individually.

- Get Cassandra DB from [here](http://cassandra.apache.org/download/) .
- Get Apache Zookeeper from [here](https://zookeeper.apache.org/) .
- Get Apache Kafka from [here](https://kafka.apache.org/downloads) .
- Get Redis from [here](https://redis.io/download) .

Get all the above running on above mentioned ports respectively.

# Steps for Running all the services Individually.

## Starting Node app

- Run this command to start the node app 'npm run serve'. 
- This will build & host the Angular Code, Backend APIs along with creating the required Database for our app.

### Starting Counter Service
- Run this command to start Counters Service: 'npm run svc.counter'. 

### Starting Tool Reverse Lookup Service
- Run this command to start Tools Reverse Lookup Sevice: 'npm run svc.tool'. 

### Starting Member Reverse Lookup Service
- Run this command to start Members Reverse Lookup Service: 'npm run svc.member'. 

### Starting Member Requests Service
- Run this command to start Member Requests Service: 'npm run svc.memberrequests'. 

### Starting Toolsink Service
- Run this command to start ToolSink Service: 'npm run svc.toolsink'. 

### Starting Notifications Service
- Run this command to start Notifications Service: 'npm run svc.notifications'. 



# Other useful Commands:

```
  'npm run installdb'    --> Create Keyspaces, Tables etc in Cassandra DB.
  'npm run truncatedb'   --> Truncate all the data from the database.
  'npm run coverage'     --> To check the code coverage by your testcaes with help of Istanbul.
  'npm run testcases'    --> Run all mocha testcases written for the app.
  'npm run lint'         --> To check all the Lint Errors in your code.
  'npm run test'         --> To check all the Lint Errors as well as test cases.
  'npm start'            --> Run only backend API code.
```

## For detailed information on APIs, please visit our wiki page [here](https://github.com/stackroute/calvin-communities/wiki)

[git-home]: https://git-scm.com/
[node]: https://nodejs.org/
