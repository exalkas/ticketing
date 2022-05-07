# Next.js

### to Install Next without `create-next-app`

- create a folder
- `npm init -y`
- `npm i react@17 react-dom@17 next`
- add to `package.json` at `scripts` area: `"dev": "next"`
- create a folder `pages`
- add an `index.js` there
- execute `npm run dev`

## Add Next.js to Docker and Kubernetes

- create file `Dockerfile`
- add the following code:

```
FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "run", "dev" ]
```

- create file `.dockerignore`
- add the following to it:

```
node_modules
.next
```

- create a Docker image locally: `docker build -t exalkas/ticketingclient .`
- add the image to the hub: `docker push exalkas/ticketingclient` N.B. you may have to login to Docker: `docker login -u dockerid`

## Config `Kubernetes`

- create a config deployment file `client-depl.yaml`
- add the following:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: client-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: client
  template:
    metadata:
      labels: 
        app: client
    spec:
      containers:
        - name: client
          image: exalkas/ticketingclient
# create a service to allow requests to access the included pod          
---
apiVersion: v1
kind: Service
metadata:
  name: client-srv
spec:
  selector:
    app: client
  ports:
    - name: client
      protocol: TCP
      port: 3000
      targetPort: 3000
```

## Config `Skaffold`
- add this to the end of `skaffold.yaml` in order to monitor the `client` for changes in `js` files:

```
    - image: exalkas/ticketingclient
      context: client
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: '**/*.js'
            dest: .
```

## Update `Ingress`
- update `ingress` configuration by adding a new path to the configuration file `ingress-srv.yaml`:

```
    -   path: /?(.*)
        pathType: Prefix
        backend:
            service:
                name: client-srv
                port: 
                    number: 3000
```

## To make sure that Next rerenders on changes, do the following:

- create `next.config.js` at `root` of project
- then add this:

```
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
            ignored: /node_modules/
        }
        return config
    }
}
```

- kill pod to get the newly create `next.config.js`
- get a list of pods `kubectl get pods` and note the one with `client-depl`
- `kubectl delete pods and_name_of_pod_from_previous_step`

## Setup `Next.js`

- inside `pages` add file `_app.js` 
- create a folder in root `styles`
- add file `globals.css`
- add the following code:

```
import '../styles/global.css'

export default function MyApp({Component, pageProps}) {

    return <>
        <Component {...pageProps} />
    </>
}
```

- run this: `npx tailwindcss init -p`
- creates `tailwind.config.js` and `postcss.config.js`
- copy this to `tailwind.config.js`

```
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- add to globals.css:
  
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```