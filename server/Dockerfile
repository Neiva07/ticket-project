FROM node:8-slim

WORKDIR /server

COPY . /server
RUN npm install\
    && yarn build-ts

EXPOSE 3000
CMD [ "yarn", "start" ]