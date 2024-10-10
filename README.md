# Contactos Api

`Contactos Api` es el backend para la Aplicación de Contactos desarrollada en React.

## Características

-   Endpoints para contactos del usuario.
-   Endpoints para autenticación de usuarios.
-   Validación de Datos y Token a través de middlewares.
-   Endpoints protegidos por JSON Web Token.
-   Modelos y Base de Datos alojada en MongoDB Atlas.
-   Envío de notificaciones por email.

## Propósito del Proyecto

-   Este proyecto fue desarrollado para aplicar y practicar las tecnologías de back-end que se muestran a continuación.

## Tech Stack

-   Javascript.
-   NodeJS.
-   ExpressJS.
-   Mongoose.
-   MongoDB Atlas.
-   Nodemailer.

## Herramientas de Desarrollo y otras Tecnologías

-   [ExpressJS](https://expressjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/atlas/database)
-   [Mongoose](https://mongoosejs.com/)
-   [Nodejs](https://nodejs.org/en/)
-   [Nodemailer](https://nodemailer.com/about/)
-   [Vscode](https://code.visualstudio.com/)

## Demo React Contactos App

-   [React Contactos App](https://contacts-app-njca.netlify.app/)

## Repo React Contactos App

-   [React Contactos App](https://github.com/nca1478/react-contacts-app)

## Requerimientos

-   Nodejs v12.13.0
-   Docker Destop.

## Instalación de Api y Base de Datos

## Variables de entorno

-   Renombrar .env.example a .env.
-   Agregar las credenciales al .env.
-   Actualizar variable `ENV` a `dev` o `prod` sea el caso.

## Opcion 1: Instalar Api y DB

-   Crear base de datos: `docker compose -f db/docker-compose.yml up --build -d`
-   Eliminar container: `docker compose -f db/docker-compose.yml down`
-   Instalar dependencias: `npm install`
-   Correr api: `npm run dev`

## Opcion 2: Instalar Api y DB (docker dev)

-   Ejecutar el comando: `docker compose up --build -d`
-   Para eliminar: `docker compose down --volumes`

## Opcion 3: Instalar Api (docker prod)

-   Ejecutar el comando: `docker compose -f docker-compose.prod.yml up --build -d`

## Archivo de entrada

> src/app.js
