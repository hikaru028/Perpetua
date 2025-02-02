FROM node:18

RUN apt-get update && apt-get install -y libvips-dev build-essential

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV PORT=1337 

WORKDIR /opt/

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

WORKDIR /opt/app
COPY ./ .

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
