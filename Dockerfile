# This is the multi stage build

# In the build 0 we will prepare the frontend as stopwatch
#pull the node image 
FROM node:18.14.2-alpine as stopwatch

#Set the working directory
WORKDIR /app

# copy the package.json and pnpm-lock
COPY ./package.json  . ./pnpm-lock.yaml ./

#install the dependency
RUN npm install

#Copy the other folder
COPY . .

RUN npm run build

#nginx block
FROM nginx:1.23.4-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=stopwatch /app/dist .
ENTRYPOINT [ "nginx","-g", "daemon off;" ]

