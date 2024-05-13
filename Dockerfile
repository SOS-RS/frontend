FROM node:20.13.1-alpine AS builder
WORKDIR /app
RUN apk update
RUN npm install -g npm@10.7.0
RUN npm install -g typescript
RUN npm install -g vite

COPY package.json package-lock.json ./
RUN npm install 

COPY . ./
RUN npm run build

FROM nginx:1.26.0-alpine AS production
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY --from=builder /app/certs /certs/ 
COPY --from=builder /app/nginx /etc/nginx/

EXPOSE 80
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
