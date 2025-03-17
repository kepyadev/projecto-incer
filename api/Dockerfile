FROM node:22-alpine
WORKDIR /app
COPY package*.json ./

RUN apk update && apk add --no-cache nano 
 
RUN yarn install

COPY . .

EXPOSE 3001
CMD ["yarn", "start"]