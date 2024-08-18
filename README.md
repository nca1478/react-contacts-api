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

-   Copiar todos los archivos de la carpeta docker a la raíz.
-   Ejecutar el comando: `docker compose up --build -d`
-   Para eliminar: `docker compose down --volumes`

## Opcion 2: Instalar solo Base de Datos.

-   Ejecuta: `docker compose -f db/docker-compose.yml up -d`
-   Luego: `npm install` y `npm run dev`
-   Eliminar DB: `docker compose -f db/docker-compose.yml down --volumes`

## Pruebas de Endpoints en Postman

-   Importar endpoints y variables de la carpeta postman

## Archivo de entrada

> src/app.js
