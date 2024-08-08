FROM node:20-alpine
WORKDIR /home/node

RUN apk add gettext

COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public
COPY env.js.tmpl /tmp

USER node

ENV PORT=8080
RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT ["/bin/sh","-c"]
CMD ["envsubst < /tmp/env.js.tmpl > ./public/env.js && npm run start"]