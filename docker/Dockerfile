### STAGE 1: Build timeline ###
FROM node:14-alpine AS build-app
# Install git and clone app
RUN apk update && apk add git && npm install -g npm@latest
# clone timeline library and checkout relevant branch
WORKDIR /usr/src/app/ngx-mat-timeline
RUN git clone https://github.com/mburwit/ngx-mat-timeline.git /usr/src/app/ngx-mat-timeline \
    && git checkout angular12
# install, build and link timeline lib
RUN npm ci
RUN npm run build
RUN cd dist/ngx-mat-timeline && npm link

WORKDIR /usr/src/app/ngx-admin
# clone app and checkout relevant branch
RUN git clone https://github.com/mburwit/ngx-admin.git /usr/src/app/ngx-admin \
    && git checkout mihubx-prototyp
# install app, link timeline lib and build app
RUN npm ci
RUN npm link ngx-mat-timeline
RUN npm run build:prod -- --base-href /mihubx/ --deploy-url /mihubx/

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build-app /usr/src/app/ngx-admin/docker/nginx/* /etc/nginx/
COPY --from=build-app /usr/src/app/ngx-admin/dist/* /usr/share/nginx/html/mihubx/
