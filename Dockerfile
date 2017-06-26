FROM mhart/alpine-node

RUN mkdir -p /usr/src/

WORKDIR /usr/src/

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]