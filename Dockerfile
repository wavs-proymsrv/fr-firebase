# Usar una imagen de Node como etapa de build
FROM node:18 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json al contenedor
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Copiar el archivo .env al contenedor
COPY .env .env

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen de nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de build desde la etapa de build al directorio de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que nginx está escuchando
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
