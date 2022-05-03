FROM node:alpine

WORKDIR /app

# copy package.json
COPY package.json .

# avoid installing dev dependencies at each build
RUN npm install --only=prod

# copy everything from our project folder into the /app - working folder
COPY . .

# execute the following when container starts up
CMD ["npm", "start"]