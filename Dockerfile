FROM node:10-jessie

WORKDIR /app

COPY . /app

WORKDIR /app/server
RUN npm install\
    && yarn build-ts

EXPOSE 3000
CMD [ "yarn", "watch-node"]