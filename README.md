# backend-challenge-base-quickbet (technical test)
# Backend de Autenticación y Favoritos

Este es un backend básico desarrollado en NestJS que incluye autenticación, gestión de usuarios y sistema de favoritos.

## Requisitos

- [Node.js](https://nodejs.org/) v16 o superior
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuración Local con Docker

Sigue estos pasos para ejecutar el proyecto localmente utilizando Docker:

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### 2. Configuración del archivo .env
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables
```bash
DB_HOST=db
DB_PORT=5432
DB_USER=<tu-usuario>
DB_PASSWORD=<tu-contraseña>
DB_NAME=<nombre-de-la-bd>
```
### 3. Construir y correr con Docker
Asegúrate de tener Docker corriendo en tu máquina, luego ejecuta los siguientes comandos para levantar los servicios:
```bash
docker-compose up --build
```
### 4. Acceso a la API
Una vez que los servicios estén corriendo, la API estará disponible en http://localhost:3000.
```bash
http://localhost:3000/api/v1
```
