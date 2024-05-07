# Client base image
FROM node:21.7.0-alpine as base
WORKDIR /app
COPY package.json yarn.lock ./

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

COPY public ./public
COPY src ./src
RUN yarn build

RUN yarn global add serve
CMD [ "serve", "-s", "./build" ]
