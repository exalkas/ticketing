/**
 * To add a pod to the list of pods, use the following code:
 * tell to K8 to apply the configuration file (manifest)
 * kubctl apply -f <pod.yaml>   
 * 
 * =============================
 * To list the pods in the cluster and their status:
 * 
 * kubectl get pods
 * =============================
 * To list the services in the cluster:
 * kubectl get services
 * 
 * =============================
 * to delete a pod:
 * kubectl delete pod podname
 * 
 * to delete all configuration:
 * kubectl delete -f infra/k8s (you need to be one folder above the infra folder)
 * then from the same folder, run: kubectl apply -f infra/k8s
 * 
 * =============================
 * to execute a command inside a pod:
 * kubectl exec -it [podname] [cmd]
 * 
 * =============================
 * give more information about a pod and an event log:
 * kubectl describe pod podname
 */

/**
 * WORKFLOW:
 * 
 * create a pod manifest by creating a yaml file
 * create a pod using a yaml file for setup.
 * verify the pods by kubectl get pods
 */

/**
 * yaml structure:
 * 
 * apiVersion: at which set of objects K8 should look at
 * kind: the type of object to be created. e.g. pods
 * metadata: config options
 *  name: name of the object
 * spec: attributes for the apply to the object that is being created
 *  containers: this is an array. items below this start with a "-"
 *  image: where is the iage located
 */

/**
 * DOCKER COMMANDS
 * 
 * docker build -t local image or username/imagename
 * 
 * to run a shell or any other command inside the container:
 * docker run imageid or tag -it andthecommand  (e.g. docker run -it exalkas/tickertsauth sh   opens the shell inside the container)
 * 
 * to see which containers are runnning:
 * docker ps
 * 
 * to execute commands on a running container:
 * docker exec -it idortag commandtoexecute
 * 
 * docker logs id/ortag

 */

/**
 * DOCKER WORKFLOW:
 * 
 * create a Dockerfile
 * add these to the Dockerfile: 
 * FROM node:alpine (that is which image to copy)
 * WORKDIR /app (where to run the app INSIDE the container)
 * COPY package.json . ()
 * RUN npm install
 * COPY . . (copy everything from the source code)
 * CMD ["npm", "start"]
 * 
 * create a file .dockerignore so define which file should be ignored
 * add this to .dockerignore:
 * node_modules
 * 
 * run docker build .  (this one creates the image. image is a private file system)
 * to create a tag (so you can use the tag as an alias): docker buid -t yourdockerid/tagname .
 * 
 * note down the image id
 * 
 * to run the container:
 * docker run imageid (e.g. sha256:3111db5785d27e384daf12cac5b98fd1dcc9a1cbdc352427e1efe5a7887078c0 ----keep the part without the sha256:)

 */

/**
 * DEPLOYMENT COMMANDS
 * 
 * To list all deployments: kubectl get deployments -- the number/number column indicates number of pods ready / number of pods creating
 * 
 * To print details of a deployment: kubectl describe deployment deploymentname
 * 
 * To create a deployment: kubectl apply -f deployment.yaml
 * 
 * To delete a deployment: kubectl delete deployment deploymentname
 */

/**
 * SERVICES (NETWORKING)
 * 
 * How to access our servers through all these layers?
 * 
 * We need a service.
 * Service gives access to pods from the outside world and helps pods to communicate betwwen them
 * 
 * There are types of services:
 * 
 * Cluster IP: builds urls for each pod. Exposes each pod in the cluster
 * Node Port: for dev purposes. gives access to pods from the outside world
 * Load balancer: The same as Node port regarding the part that gives access to the pods from the outside world
 * External Name: not used in current project. redirects an in-cluster request to a cname
 */

/** 
 * SCAFFOLD
 * 
 * It's a command line tool used to automate kubernetes tasks
 * 
 * Updates really easy a running pod
 * For more check scaffold.dev
*/