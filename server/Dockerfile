FROM node:18-alpine

WORKDIR /music-app/server

EXPOSE 7500

COPY package*.json ./

COPY ./ ./

RUN npm install

CMD ["npm", "run", "dev"]