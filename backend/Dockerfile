FROM node:22.17.0

WORKDIR / app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4612

CMD ["npm", "run", "dev"]