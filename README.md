# backend-challenge-base-quickbet (technical test)
# Backend de Autenticación y Favoritos

Este es un backend básico desarrollado en NestJS que incluye autenticación, gestión de usuarios y sistema de favoritos.

## Requisitos

- [Node.js](https://nodejs.org/) v16 o superior
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
  
## Estructura de la raiz
```
src/
│
├── auth/                         # Módulo de autenticación
│   ├── auth.controller.ts         # Controlador de autenticación
│   ├── auth.service.ts            # Lógica de negocio para autenticación
│   ├── auth.module.ts             # Módulo de autenticación
│   ├── constants/                 # Constantes de autenticación
│   │   ├── jwt.constants.ts       # Constantes relacionadas con JWT
│   ├── decorator/                 # Decoradores para autenticación
│   │   ├── roles.decorator.ts     # Decorador para roles de usuario
│   ├── dto/                       # DTOs (Data Transfer Objects)
│   │   ├── login.dto.ts           # DTO para login
│   │   ├── register.dto.ts        # DTO para registro
│   ├── guards/                    # Guards para proteger rutas
│   │   ├── auth.guard.ts          # Guard para autenticación
│   │   ├── roles.guard.ts         # Guard para roles de usuario
│
├── users/                        # Módulo de gestión de usuarios
│   ├── users.controller.ts        # Controlador de usuarios
│   ├── users.service.ts           # Lógica de negocio de usuarios
│   ├── users.module.ts            # Módulo de usuarios
│   ├── users.repository.ts        # Repositorio de usuarios
│   ├── dto/                       # DTOs (Data Transfer Objects)
│   │   ├── create-user.dto.ts     # DTO para crear un usuario
│   │   ├── update-user.dto.ts     # DTO para actualizar un usuario
│   └── entities/
│       ├── user.entity.ts         # Entidad de usuario (modelo)
│
├── favorites/                    # Módulo de gestión de favoritos
│   ├── favorites.controller.ts    # Controlador de favoritos
│   ├── favorites.service.ts       # Lógica de negocio de favoritos
│   ├── favorites.module.ts        # Módulo de favoritos
│   ├── favorites.repository.ts    # Repositorio de favoritos
│   └── entities/
│       ├── favorite.entity.ts     # Entidad de favoritos (modelo)
│
├── common/                       # Elementos comunes (decoradores, enums, interfaces)
│   ├── decorators/
│   │   ├── active-user.decorator.ts  # Decorador para el usuario activo
│   ├── enums/
│   │   ├── role.enum.ts           # Enum para los roles de usuario
│   ├── interface/
│       ├── user-active.interface.ts  # Interfaz para el usuario activo
│
├── app.module.ts                 # Módulo raíz
└── main.ts                       # Punto de entrada de la aplicación
```

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
## 5. EndPoints

### Autenticación
- **POST** `/api/v1/auth/login` - Iniciar sesión.
- **POST** `/api/v1/auth/register` - Registrarse.
- **GET** `/api/v1/auth/profile` - Obtener perfil de usuario.

### Gestión de Usuarios
- **POST** `/api/v1/users` - Crear usuario.
- **GET** `/api/v1/users` - Obtener lista de usuarios.
- **GET** `/api/v1/users/{email}` - Obtener usuario por email.
- **PATCH** `/api/v1/users/{email}` - Actualizar usuario.
- **DELETE** `/api/v1/users/{email}` - Eliminar usuario.

### Favoritos
- **POST** `/api/v1/favorite` - Añadir a favoritos.
- **GET** `/api/v1/favorite` - Obtener lista de favoritos.
- **DELETE** `/api/v1/favorite/{itemId}` - Eliminar favorito.

## Licencia
aqui va una licencia.

