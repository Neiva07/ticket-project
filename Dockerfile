FROM node:8-slim

WORKDIR /app

COPY . /app

WORKDIR /app/server
RUN npm install\
    && yarn build-ts

EXPOSE 3000
CMD [ "yarn", "start" ]