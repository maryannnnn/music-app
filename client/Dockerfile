FROM node:18-alpine

WORKDIR /music-app/client

EXPOSE 3000

COPY package*.json ./

COPY ./ ./

RUN npm install

CMD ["npm", "run", "dev"]