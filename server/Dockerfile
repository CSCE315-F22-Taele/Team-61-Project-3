FROM node:15.4

COPY . /app

COPY package*.json .
RUN npm install

COPY . . 
CMD npm start