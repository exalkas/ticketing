Container has everything required in order to run one application


Kubernetes is a tool that helps us run multiple (different) containers.
We need to configure Kubernetes and tell to it how to run cntainers and how we want them to interact between them.and interact with other containers

Kubernetes creates a cluster (multiple virtual machines together). Each virtual machine is called node

There is the Master program which does the job and needs some configuration

We need to create an image.
To create an image we need to create a file
Run the docker build command


#to see which version of kubernetes you are running:
kubectl version 

# to configure kubernetes, we use kubectl

Many Nodes together are a cluster. A cluster has also a master in order to manage the nodes.
Node is a virtual machine that runs a container.

A node has a pod.
A pod could have containers or one container
A pod has also service?

Pods are being managed by what is called a deployment
Deployment monitors the identical pods and 
Deployment reads the configuration file.

Services provide an easy to remember url

Kubernetes Config Files
=======================
Inside config files we will define Deployments, pods and services using YAML. Services are called objects

to cinfigure kubernetes use YAML files. (Yet Another Markup Language)

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


## SERVICES (NETWORKING)

**In order to access our servers through all these layers we need a service**

**Service gives access to pods from the outside world and helps pods to communicate betwwen them**

### There are types of services: (all these are objects in the config files)

- `Cluster IP`: builds urls for each pod. Exposes each pod in the cluster
- `Node Port`: for dev purposes. gives access to pods from the outside world
- `Load balancer`: The same as Node port regarding the part that gives access to the pods from the outside world
- `External Name`: not used in current project. redirects an in-cluster request to a cname


## To create a `NodePort` service:

- **THIS IS FOR DEVELOPMENT purposes**
- the **purpose** of a `NodePort` is to expose to the world the pods we want
- create a file inside the infra/k8s folder named: `nameOfService-srv.yaml`
- add the following to the file:
  
```
apiVersion: v1
kind: Service
metadata: 
  name: auth-srv
spec:
  type: NodePort
  # select the pods to expose
  selector:
  # find the pods with label auth:
    app: auth
  ports:
    - name: auth
      protocol: TCP
      # port is the Node Port service port
      # targetport is the port of the pod inside the node
      port: 5000
      targetPort: 5000
```

- if no Skaffold running, execute the following: `kubectl apply -f andthenameofthefile.yaml`
- to verify/get the port: `kubectl get services`
- at the ports column, `5000:32429/TCP` the right port is the working one. Check  `localhost:32429`
- for more details type: `kubectl describe service nameofservice`

## To create Cluster IP service

### To connect 2 services beween them:

#### use their service name and the port that we can see at: `kubectl get services`

### to restart a deployment: `kubectl rollout restart deployment deployment_name`

# Issue: there are duplicated deployments and all have status errImageNeverPull

# Load Balancer Service

- Each cluster has only one Load Balancer service (from now on LB)
- LB has some logic in order to route the incoming requests to the appropritate pod (basically to their ClusterIP service)
- Kubernettes **HAS** an LB service
- AN LB service, supplies traffic to a **SINGLE POD**
- Ingres/Ingress Controller is a pod with a set of routing rules **TO OTHER SERVICES**
- An LB service has a *config file*
- INGRESS Controller sits AFTER the LB and BEFORE the pods

## Install Ingress-nginx AND NOT kubernetes-ingress:

- `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml`
- create a configuration file for ingress controller
  - create file `ingress-srv.yaml` inside `infra/k8s`


## Create a Secret Pod in Kubernetes:

- We will create a secret object with a command and not with a config file
- secrets have different types
- to create a JWT secret:
`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret` "asdf1234" in this case
- `JWT` is the key name and `secret` is the value

- to get the secrets in a cluster: `kubectl get secrets`