# Docker/Kubernetes Workflow

1. build an image for the microservice: `docker build -t docker_username/image_name`
2. push the image to Docker Hub: `docker push docker_username/image_name` 
3. Create a deployment for that microservice: 
    1. add `event-bus-depl.yaml` to `infra/k8s`
    2. `kubectl apply -f event-bus.yaml`
4. Create a Cluster IP Service for each pod
5. 