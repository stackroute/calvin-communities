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
- pull the latest commit code from this branch by using 'git pull origin dev-wave-18'

### Node.js and Tools

- Get Node v8 or above from here [Node.js][node].
- Install the tool dependencies: `npm install`

### Angular CLI
- Install Angular CLI, follow instructuions at https://cli.angular.io

### Docker
- You can download required docker & docker-compose versions from [here](https://www.docker.com),  according to your host system OS.

# Deploying or Running the App

You can run the app locally or as a fully dockerized set of containers, below explained how to deploy as a Dockerized set of containers.

# Steps to Dockerize this app

Clone the project locally, ensure all pre-requisites are installed

## step-0 Building angular code

- Before Dockerizing the App, we need to build the angular code on the local or host machine
- Angular code provide Admin panel UI
- To build the angualr code, please run command `npm run build`
- once the build is complete, verify if `dist` folder is created, which will have built code and gets baked into docker images in the next steps.

## step-1 dockerize the app

- Need to build the docker image for the app
- To build the image, use command `docker-compose build` (prefix `sudo`, if required)
- Once the build is completed successfully, run the command `docker images` and see if the new image names you can see as per the image names given in the `docker-compose.yml` file

## step-2 run the dockerized app
- Ensure, ports [`3000`, `9042`, `2181`, `9092`, `6379`] are free on your Host Machine OR change the ports for the services in `docker-compose.yml` as per your need before running the app
- Use command `docker-compose up` to run the app in foreground and command `docker-compose up -d` to run in background
- Assuming now the services are up, you can view the logs using command `docker-compose logs -f --tail=1` to see the running log
- Please refer docker-compose reference to check other useful commands on viewing the logs in more advanced way

Above steps should ensure the app is running and now you should be able to access th UI from http://localhost:3000 and API from http://localhost:3000/api/v1/

Refer the API documentation from [here](https://github.com/stackroute/calvin-communities/wiki)

# Running services locally

## Prerequisites for running all Micro Services individually and locally

- Get Cassandra DB from [here](http://cassandra.apache.org/download/) .
- Get Apache Zookeeper from [here](https://zookeeper.apache.org/) .
- Get Apache Kafka from [here](https://kafka.apache.org/downloads) .
- Get Redis from [here](https://redis.io/download) .

Get all the above running on above mentioned ports respectively.

### Starting Node app

- Run this command to start the node app `npm run serve`. 
- This will build & host the Angular Code, Backend APIs along with creating the required Database for our app, (yes DB is automatically created if not exists already)

### Start required services using these commands 

- **Counter Service**  `npm run svc.counter`
- **Reverse Lookup Service** `npm run svc.tool` 
- **Member Reverse Lookup Service** `npm run svc.member`
- **Member Requests Service**  `npm run svc.memberrequests`
- **Toolsink Service** `npm run svc.toolsink`
- **Notifications Service** `npm run svc.notifications`

### Other commands available, if needed

  `npm run installdb`    --> Create Keyspaces, Tables etc in Cassandra DB.
  `npm run truncatedb`   --> Truncate all the data from the database.
  `npm run coverage`     --> To check the code coverage by your testcaes with help of Istanbul.
  `npm run testcases`    --> Run all mocha testcases written for the app. BEST OF LUCK...!
  `npm run lint`         --> To check all the Lint Errors in your code.
  `npm run test`         --> To check all the Lint Errors as well as test cases.
  `npm start`            --> Run only backend API code, junk UI :-) 

## For detailed information on APIs, please visit our wiki page [here](https://github.com/stackroute/calvin-communities/wiki)

[git-home]: https://git-scm.com/
[node]: https://nodejs.org/
