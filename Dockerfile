FROM node:12.13.0-alpine3.9 as dev
WORKDIR /app
COPY package.json ./
RUN npm install
CMD [ "npm", "run", "dev" ]

FROM node:12.13.0-alpine3.9 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile

FROM node:12.13.0-alpine3.9 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:12.13.0-alpine3.9 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --only=production --frozen-lockfile

FROM node:12.13.0-alpine3.9 as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APPVERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
CMD [ "node", "build/app.js" ]
