### STAGE 1: Build ###
FROM node:14-alpine AS build
# Install git and clone app
RUN apk update && apk add git
# clone app into workdir and checkout relevant branch
RUN git clone https://github.com/mburwit/ngx-admin.git /usr/src/app \
    && git checkout mihubx-prototyp
# clone timeline library into workdir and checkout relevant branch
RUN git clone https://github.com/mburwit/ngx-mat-timeline.git /usr/src/lib \
    && git checkout angular12
# build and link timeline lib
WORKDIR /usr/src/lib
RUN npm ci
RUN npm run build
WORKDIR /usr/src/lib/dist/ngx-mat-timeline
RUN npm link
# build and link timeline lib
WORKDIR /usr/src/app
RUN npm ci
RUN npm link ngx-mat-timeline
RUN npm run build:prod -- --base-href /mihubx/ --deploy-url /mihubx/

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /usr/src/app/docker/nginx/* /etc/nginx/
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/mihubx/
