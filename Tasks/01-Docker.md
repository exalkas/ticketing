
# DOCKER WORKFLOW

- create a Dockerfile
- add these to the Dockerfile: 

```
# use "#" from comments ONLY at the beggining of the line
# alpine linux is the smallest in size
FROM node:alpine 
# where to run the app INSIDE the container
WORKDIR /app 
# syntax for copying: COPY source destination
COPY package.json . 
RUN npm install
# copy everything from the source code
COPY . .
CMD ["npm", "start"]
```


- create a file .dockerignore so define which file should be ignored
- add this to .dockerignore:

`node_modules`

- run docker `build . ` (this one creates the image. image is a private file system)
- to create a tag (so you can use the tag as an alias): 
 
`docker buid -t yourdockerid/tagname .`

- note down the image id
- to run the container:

`docker run imageid` e.g. sha256:3111db5785d27e384daf12cac5b98fd1dcc9a1cbdc352427e1efe5a7887078c0 

- keep the part without the sha256:
  
`docker run 3111db5785d27e384daf12cac5b98fd1dcc9a1cbdc352427e1efe5a7887078c0`

# DOCKER Commands


- `docker build -t local image or username/imagename`

- to run a shell or any other command inside the container:
`docker run imageid or tag -it andthecommand`  
e.g. `docker run -it exalkas/tickertsauth sh`   opens the shell inside the container
- to see which containers are runnning:
`docker ps`
- to execute commands on a running container:
`docker exec -it idortag commandtoexecute`

- see the logs of a container: `docker logs id/ortag`
