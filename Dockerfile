FROM node:16



WORKDIR /usr/src/app/frontend
COPY ./frontend .
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/api
COPY ./backend .
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]