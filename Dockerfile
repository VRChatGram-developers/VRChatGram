FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# https://github.com/nodejs/docker-node/tree/main?tab=readme-ov-file#nodealpine
# One common issue that may arise is a missing shared library required for use of process.dlopen.
# To add the missing shared libraries to your image, adding the libc6-compat package in your Dockerfile is recommended: apk add --no-cache libc6-compat
RUN apk add --no-cache libc6-compat mysql-client

USER node

# Install dependencies
WORKDIR /app
COPY --chown=node:node /nextjs ./
RUN npm install

RUN chmod -R 755 ./node_modules