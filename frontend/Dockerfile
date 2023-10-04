FROM node:18-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install -f

COPY ./ /app

EXPOSE 3000

CMD ["npm","run","dev"]
