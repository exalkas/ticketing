# SCAFFOLD

### It's a command line tool used to automate kubernetes tasks

Updates really easy a running pod
For more check `scaffold.dev`

- install: `choco install -y skaffold`
- skaffold runs outside of the k8 cluster
- to run scaffold: `skaffold dev`

# Skaffold workflow

- in the root folder of the project create a file called `skaffold.yaml`
- should include the following:
```
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
    #where are the config files for k8. which files to watch (.yaml)
    # the point is when we make a change to any of those files, skaffold will build the deployments automatically
    # otherwise we have to run kubectl apply -f each time we make changes to our code
    # when skaffold is starting, will delete all found configurations and then build them again
    # when stopping skaffold, will find all objects created and delete them
    # in this array list all the files you want to sync
      - ./infra/k8s/*
build:
  local:
  # push: false means to don't push to docker hub
    push: false    
  # which folder/project to check for changes
  # the point is or update the files in the src folder or rebuild the image when there is a change outside it e.g. in package.json
  artifacts:
    # which image to rebuild when needed
    - image: exalkas/auth
      context: auth
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
        # src is usually for react unless there is such a structure in node
          # - src: 'src/**/*.js'
          - src: 'src/**/*.ts'
          # sync the file inside of our current container
          # the "." means that take the file from current dir and copy into the corresponding folder in the image
            dest: .
```