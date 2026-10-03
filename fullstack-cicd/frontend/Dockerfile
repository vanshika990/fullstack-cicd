# Build React application
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY public ./public
COPY index.html ./
COPY vite.config.js ./

RUN npm run build

# Serve React using Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
