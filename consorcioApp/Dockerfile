FROM node:alpine

RUN npm install -g npm@latest
RUN npm install -g @angular/cli

WORKDIR /app

COPY . /app

CMD npm install && ng serve --host 0.0.0.0 --port 4200

EXPOSE 4200