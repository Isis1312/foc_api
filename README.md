Sistema de Gestión de Inventario - API REST
API REST desarrollada con Node.js, Express y Prisma para la gestión de inventarios, usuarios, almacenes y productos.
-------------------
Tecnologías Utilizadas
Node.js (v18+)

Express.js

Prisma (ORM)

PostgreSQL

express-validator

CORS
----------------
Instalación
----------------------
Prerrequisitos
Node.js 18 o superior

PostgreSQL instalado y corriendo

npm

1. Clonar el repositorio bash
git clone <tu-repositorio>

cd <nombre-del-proyecto>

2. Instalar dependencias bash
npm install

3. Configurar variables de entorno bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tus configuraciones reales
nano .env

4. Configurar la base de datos bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones iniciales
npx prisma migrate dev --name init

5. Ejecutar el proyecto bash
# Desarrollo y produccion 

npm run start:dev


--------------------------------------
Variables de Entorno Necesarias
--------------------------------------
Crea un archivo .env con las siguientes variables:

API_PORT: Puerto donde corre el servidor (default: 3800)

NODE_ENV: Entorno de ejecución (development/production)

DATABASE_URL: URL de conexión a PostgreSQL en formato: postgresql://usuario:password@host:puerto/nombre_bd

Cómo Ejecutar Migraciones
Migraciones Iniciales bash

npx prisma migrate dev --name init


-----------------------
Características
-------------------
Arquitectura por capas (Controladores, Servicios, Rutas, Validadores)

Base de datos PostgreSQL con Prisma ORM

Validaciones con express-validator

API RESTful completa con CRUD

CORS habilitado

Módulos ES6

Entidades Implementadas
Nivel 1 (Independientes)
Roles - Gestión de roles de usuario

Categories - Categorías de productos

Warehouses - Almacenes físicos

Nivel 2 (Dependen de Nivel 1)
Users - Usuarios del sistema

Areas - Áreas dentro de los almacenes

Nivel 3 (Dependen de Nivel 2)
Products - Productos del inventario

--- CREADO POR ESTUDINATES DEL 4TO SEMESTRE --- 
      --- DE INFORMATICA DE IUJO ---