# ticket-project
An easy solution to shop tickets  

## **To run in developer mode:**
1. Clone the repository
2. Install Docker and Docker-compose 

   Installing the latest stable release for Docker on Ubuntu:  
    `sudo curl -sSL https://get.docker.com/ | sh`

   Installing the latest stable release for Docker-compose on Ubuntu:  
    `sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
   
3. cd into the repository dir created
4. run `docker-compose up`  
5. open a new terminal tab and run `docker exec -it ticket-project yarn watch-ts`  

The container bind mounts the host's server/src into the container's respective dir.  
Now you can make changes to the typescript files inside server/src and the container will restart automatically to apply those changes.
