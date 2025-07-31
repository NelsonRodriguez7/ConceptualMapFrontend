# Etapa 1: Compilar la app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production --project=conceptualMapFrontend

# Etapa 2: Servir app con NGINX
FROM nginx:alpine

# Copiar el build angular a nginx
COPY --from=build /app/dist/conceptual-map-frontend /usr/share/nginx/html

# Copiar la configuración personalizada de nginx si tienes
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
