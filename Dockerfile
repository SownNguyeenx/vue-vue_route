FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY ./ .
RUN npm run serve