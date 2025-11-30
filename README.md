Sistema de Gestión de Inventario - API REST
API REST desarrollada con Node.js, Express y Prisma para la gestión de inventarios, usuarios, almacenes y productos.

Características
Arquitectura por capas (Controladores, Servicios, Rutas, Validadores)

Base de datos PostgreSQL con Prisma ORM

Validaciones con express-validator

Soft delete en todas las entidades

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

Tecnologías Utilizadas
Node.js (v18+)

Express.js

Prisma (ORM)

PostgreSQL

express-validator

CORS

Instalación
Prerrequisitos
Node.js 18 o superior

PostgreSQL

npm 

1. Clonar el repositorio
bash
git clone <tu-repositorio>
cd <nombre-del-proyecto>

2. Instalar dependencias bash
npm install

3. Configurar variables de entorno bash
# Copiar el archivo de ejemplo
cp .env.example .env


4. Configurar la base de datos bash
# Generar cliente de Prisma
npx prisma generate

# Crear nueva migración(CADA QUE SE CREE UNA TABLA NUEVA EN EL ESQUEMA EJECUTAR ESTE COMANDO)
npx prisma migrate dev --name nombre_migracion



5. Ejecutar el proyecto bash

# Desarrollo
npm run dev

# Producción
npm start


Estructura del Proyecto
text
src/
├── app.js
├── servidor/
│   └── server.js
├── rutas/
│   ├── users.rutas.js
│   ├── roles.rutas.js
│   └── ...
├── controladores/
│   ├── users.controladores.js
│   ├── roles.controladores.js
│   └── ...
├── servicios/
│   ├── users.servicios.js
│   ├── roles.servicios.js
│   └── ...
├── validators/
│   ├── users.validator.js
│   ├── roles.validator.js
│   └── ...
└── config/
    └── prisma.config.js



--- CREADO POR ESTUDINATES DEL 4TO SEMESTRE ---
        --- DE INFORMATICA DE IUJO ---