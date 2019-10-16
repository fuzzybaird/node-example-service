  
FROM node:11.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY . /usr/src/app/

# # build necessary, even if no static files are needed,
# # since it builds the server as well
# RUN npm run build

# expose 5000 on container
EXPOSE 8080

# start the app
CMD [ "npm", "start" ]