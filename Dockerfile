FROM mhart/alpine-node

RUN apk update && \
    apk add git && \
    apk add --no-cache python build-base

#RUN apk add --no-cache python build-base

RUN mkdir -p /usr/src/

WORKDIR /usr/src/

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
