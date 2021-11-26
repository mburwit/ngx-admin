### STAGE 1: Build ###
FROM node:14-alpine AS build
# Install git and clone app
RUN apk update && apk add git
# set working directory
WORKDIR /usr/src/app
# clone app into workdir and checkout relevant branch
RUN git clone https://github.com/mburwit/ngx-admin.git /usr/src/app \
    && git checkout mihubx-prototyp
# install app
RUN npm ci
# build app
RUN npm run build:prod -- --base-href /mihubx/ --deploy-url /mihubx/

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /usr/src/app/docker/nginx/* /etc/nginx/
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/mihubx/
