FROM node:latest as build-stage
WORKDIR /
COPY package*.json ./
RUN npm i
EXPOSE 8080
CMD [ "npm", "run", "serve" ]