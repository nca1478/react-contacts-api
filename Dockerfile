# syntax=docker/dockerfile:1

ARG NODE_VERSION=12.13.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,id=s/42902a8c-c805-4c05-a041-276e765a479f-/root/npm,target=/root/.npm \
    npm ci --omit=dev

FROM deps AS build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,id=s/42902a8c-c805-4c05-a041-276e765a479f-/root/npm,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM base AS final
ENV NODE_ENV=production
USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/public ./public
EXPOSE 4000
CMD npm run serve
