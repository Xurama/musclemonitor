FROM node:20-alpine
WORKDIR /home/node

RUN apk add busybox-extras

COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./package-lock.json ./

COPY --chown=node:node webpack.config.js   ./
COPY --chown=node:node tsconfig.json       ./

COPY --chown=node:node ./src ./src

USER node

RUN npm install
RUN npm run build

EXPOSE 3000

STOPSIGNAL SIGTERM

CMD ["npm", "run", "start"]