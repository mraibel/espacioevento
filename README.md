# Espacio Evento - API REST

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Arquitectura y Tecnologías

Este proyecto implementa una API REST para la gestión de eventos utilizando una arquitectura en capas:

### Arquitectura MER (Modelo-Entidad-Relación)

```
[Evento]
  - id (PK)
  - nombre
  - fecha
  - hora
  - cupos
  - inscritos
```

### Tecnologías Utilizadas

- **NestJS**: Framework elegido por su arquitectura modular y escalable, inspirada en Angular
- **PostgreSQL**: Base de datos relacional que ofrece consistencia ACID y excelente rendimiento
- **TypeORM**: ORM que proporciona una capa de abstracción robusta y tipado fuerte con TypeScript
- **Docker**: Contenedorización para asegurar consistencia entre ambientes
- **class-validator**: Validación declarativa de DTOs
- **Jest**: Framework de testing incluido en NestJS

## Instalación y Ejecución

1. Clonar el repositorio y entrar al directorio:
```bash
git clone <repositorio>
cd espacioevento
```

2. Instalar dependencias:
```bash
npm install
```

3. Instalar Nest CLI (si no está instalado):
```bash
npm i -g @nestjs/cli
```

4. Levantar la base de datos:
```bash
docker-compose up -d
```

5. Iniciar la aplicación:
```bash
npm run start:dev
```

6. Cargar datos iniciales:
```
GET http://localhost:3000/seed
```

## Estructura del Proyecto

```
src/
├── eventos/              # Módulo principal de eventos
│   ├── dto/             # Data Transfer Objects
│   ├── entities/        # Entidades de la base de datos
│   ├── interfaces/      # Interfaces y tipos
│   ├── eventos.controller.ts
│   ├── eventos.service.ts
│   └── eventos.module.ts
├── seed/                # Módulo para cargar datos iniciales
└── main.ts             # Punto de entrada de la aplicación
```

## API Endpoints

### Eventos

#### Crear Evento
- **POST** `/eventos`
```json
{
  "nombre": "Conferencia Tech",
  "fecha": "2025-12-01",
  "hora": "14:30",
  "cupos": 50
}
```

#### Listar Eventos
- **GET** `/eventos`
- Retorna array de eventos ordenados por fecha y hora

#### Obtener Evento
- **GET** `/eventos/:id`
- Retorna evento específico o 404 si no existe

#### Actualizar Evento
- **PUT** `/eventos/:id`
```json
{
  "nombre": "Conferencia Tech Actualizada",
  "fecha": "2025-12-01",
  "hora": "15:30",
  "cupos": 60
}
```

#### Eliminar Evento
- **DELETE** `/eventos/:id`
- Elimina el evento especificado

#### Inscribirse a Evento
- **POST** `/eventos/:id/inscribir`
- Incrementa el contador de inscritos si hay cupos disponibles

### Seed (Datos Iniciales)
- **GET** `/seed`
- Carga datos de prueba en la base de datos

## Validaciones

- Nombre: mínimo 3 caracteres, máximo 255
- Fecha: formato YYYY-MM-DD
- Hora: formato HH:MM (24h)
- Cupos: número positivo mayor a 0
- Inscritos: no puede superar el número de cupos

## Stack Tecnológico
- Node.js con NestJS
- PostgreSQL (Base de datos)
- TypeORM (ORM)
- Docker (Contenedorización)
- Jest (Testing)

## Testing con Postman

### Flujo de prueba recomendado:

1. Ejecutar primero el endpoint de seed para cargar datos iniciales:
```http
GET http://localhost:3000/seed
```

2. Listar eventos para ver los datos cargados:
```http
GET http://localhost:3000/eventos
```

3. Crear un nuevo evento:
```http
POST http://localhost:3000/eventos
Content-Type: application/json

{
    "nombre": "Conferencia de JavaScript",
    "fecha": "2025-12-01",
    "hora": "14:30",
    "cupos": 50
}
```

4. Utilizar el ID del evento creado para probar:

   Consulta individual:
   ```http
   GET http://localhost:3000/eventos/1
   ```

   Inscripción:
   ```http
   POST http://localhost:3000/eventos/1/inscribir
   ```

   Actualización:
   ```http
   PUT http://localhost:3000/eventos/1
   Content-Type: application/json

   {
       "nombre": "Conferencia de JavaScript Actualizada",
       "fecha": "2025-12-01",
       "hora": "15:30",
       "cupos": 60
   }
   ```

   Eliminación:
   ```http
   DELETE http://localhost:3000/eventos/1
   ```

Todos los endpoints incluyen validaciones y devolverán los códigos de estado HTTP apropiados:
- 200: Operación exitosa
- 201: Recurso creado
- 400: Datos inválidos
- 404: Recurso no encontrado
