FROM node:14.15.5-alpine3.13 AS build

WORKDIR /app

COPY /app /app

RUN npm install
RUN npm run build

FROM nginx:alpine-slim AS server

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

COPY --from=build /app/build /var/www/html
