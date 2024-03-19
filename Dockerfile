FROM node:20-alpine

ARG VITE_ISSUER_BASE_URL
ARG VITE_CLIENT_ID
ARG VITE_AUDIENCE

ENV VITE_ISSUER_BASE_URL=$VITE_ISSUER_BASE_URL
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_AUDIENCE=$VITE_AUDIENCE


RUN mkdir /home/node/app && chown -R node:node /home/node/app
# RUN mkdir /home/node/app/db && chown -R node:node /home/node/app/db
WORKDIR /home/node/app

COPY --chown=node:node ./ ./

# COPY --chown=node:node api/package*.json ./
USER node
# ENV NODE_ENV=test
WORKDIR /home/node/app/api
# COPY --chown=node:node api/package*.json ./

RUN npm install && npm cache clean --force --loglevel=error
# COPY --chown=node:node api ./

RUN npm run build

RUN mkdir /home/node/web && chown -R node:node /home/node/web
WORKDIR /home/node/app
# COPY --chown=node:node package*.json ./
RUN npm install && npm cache clean --force --loglevel=error
# COPY --chown=node:node web ./

ENV NODE_ENV=production
RUN npm run build:docker

WORKDIR /home/node/app
EXPOSE 3000
USER node

CMD ["node", "./api/dist/index.js"]
