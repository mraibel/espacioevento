# Espacio Evento - API REST

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Sistema de gestión de eventos con salas, inscripciones y pagos integrados. Backend desarrollado con NestJS, TypeORM y PostgreSQL.

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
GET http://localhost:3000/api/seed
```

## Endpoints de la API

### Autenticación

#### POST `/api/auth/register`

Registrar un nuevo usuario.

**Body:**

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "123456",
  "roles": ["asistente"] // asistente | organizador | administrador
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "correo": "juan@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "roles": ["asistente"]
  }
}
```

#### POST `/api/auth/login`

Iniciar sesión.

**Body:**

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response:** Igual a registro

#### GET `/api/auth/check-status`

Verificar estado de autenticación.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "correo": "juan@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "roles": ["asistente"]
  }
}
```

---

### Usuarios

#### GET `/api/usuarios`

Listar todos los usuarios. **Solo administradores**.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "id_usuario": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@example.com",
    "roles": ["administrador"],
    "fecha_registro": "2025-01-15T10:30:00Z"
  }
]
```

#### GET `/api/usuarios/:id`

Obtener un usuario por ID. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### PATCH `/api/usuarios/:id`

Actualizar un usuario. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez"
}
```

#### DELETE `/api/usuarios/:id`

Eliminar un usuario. **Solo administradores**.

**Headers:** `Authorization: Bearer <token>`

---

### Salas

#### GET `/api/salas`

Listar todas las salas. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "id_sala": 1,
    "nombre": "Sala Principal",
    "ubicación": "Edificio A - Piso 1",
    "capacidad": 150,
    "precio_arriendo": 2000,
    "estado": "disponible" // disponible | arrendada | inactiva
  }
]
```

#### GET `/api/salas/:id`

Obtener una sala por ID. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### POST `/api/salas`

Crear una nueva sala. **Solo administradores**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "nombre": "Sala VIP",
  "ubicación": "Edificio B - Piso 3",
  "capacidad": 50,
  "precio_arriendo": 3500,
  "estado": "disponible"
}
```

#### PATCH `/api/salas/:id`

Actualizar una sala. **Solo administradores**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "estado": "arrendada"
}
```

#### DELETE `/api/salas/:id`

Eliminar una sala. **Solo administradores**. No se puede eliminar si está siendo usada por eventos.

**Headers:** `Authorization: Bearer <token>`

---

### Eventos

#### GET `/api/eventos`

Listar todos los eventos. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "id_evento": 1,
    "id_organizador": 1,
    "id_sala": 1,
    "nombre_evento": "Concierto de Rock",
    "descripcion": "Un gran concierto de rock...",
    "fecha": "2025-03-15",
    "hora_inicio": "20:00",
    "hora_fin": "23:30",
    "cupos_totales": 150,
    "cupos_disponibles": 148,
    "precio_entrada": 25000,
    "tipo_evento": "público", // público | privado
    "estado": "activo" // activo | finalizado | cancelado
  }
]
```

#### GET `/api/eventos/:id`

Obtener un evento por ID. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### POST `/api/eventos`

Crear un nuevo evento. **Solo organizadores y administradores**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "id_organizador": 1,
  "id_sala": 1,
  "nombre_evento": "Festival de Música",
  "descripcion": "Un festival increíble",
  "fecha": "2025-04-10",
  "hora_inicio": "18:00",
  "hora_fin": "23:00",
  "cupos_totales": 200,
  "precio_entrada": 15000,
  "tipo_evento": "público",
  "estado": "activo"
}
```

#### PUT `/api/eventos/:id`

Actualizar un evento completo. **Solo organizadores y administradores**.

**Headers:** `Authorization: Bearer <token>`

#### DELETE `/api/eventos/:id`

Eliminar un evento. **Solo organizadores y administradores**.

**Headers:** `Authorization: Bearer <token>`

---

### Inscripciones

#### GET `/api/inscripciones`

Listar todas las inscripciones. **Solo organizadores y administradores**.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "id_inscripcion": 1,
    "id_usuario": 4,
    "id_evento": 1,
    "fecha_inscripcion": "2025-02-10",
    "estado_pago": "pagado", // pendiente | pagado
    "asistencia": false
  }
]
```

#### GET `/api/inscripciones/:id`

Obtener una inscripción por ID. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### GET `/api/inscripciones/usuario/:id`

Obtener todas las inscripciones de un usuario. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### GET `/api/inscripciones/evento/:id`

Obtener todas las inscripciones de un evento. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### POST `/api/inscripciones`

Crear una nueva inscripción. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "id_usuario": 4,
  "id_evento": 1,
  "fecha_inscripcion": "2025-02-10",
  "estado_pago": "pendiente",
  "asistencia": false
}
```

#### PUT `/api/inscripciones/:id`

Actualizar una inscripción completa. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### PATCH `/api/inscripciones/:id`

Actualizar parcialmente una inscripción. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

#### PATCH `/api/inscripciones/:id/pago`

Actualizar el estado de pago de una inscripción. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "estado_pago": "pagado"
}
```

#### DELETE `/api/inscripciones/:id`

Eliminar una inscripción. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

---

### Pagos

#### POST `/api/pagos/mercadopago/create-preference`

Crear una preferencia de pago en Mercado Pago. **Requiere autenticación**.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "id_inscripcion": 1
}
```

**Response:**

```json
{
  "id": "1234567890",
  "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=...",
  "sandbox_init_point": "https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=..."
}
```

---

## Roles y Permisos

### Asistente

- Ver eventos
- Inscribirse a eventos
- Ver sus propias inscripciones
- Realizar pagos

### Organizador

- Todo lo de Asistente
- Crear, editar y eliminar sus propios eventos
- Ver inscripciones de sus eventos
- Seleccionar salas disponibles

### Administrador

- Todo lo de Organizador
- Gestionar salas (CRUD completo)
- Ver todos los usuarios
- Ver todas las inscripciones
- Gestionar cualquier evento

## Tecnologías

- **NestJS** - Framework backend
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Mercado Pago SDK** - Pasarela de pagos
- **Docker** - Contenedor de base de datos

## Variables de Entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=espacioevento

JWT_SECRET=tu_secreto_jwt

MERCADOPAGO_ACCESS_TOKEN=TEST-6202514999315089-121421-...
```

## Usuarios de Prueba

Después de ejecutar el seed (`GET /api/seed`):

| Email              | Password | Rol           |
| ------------------ | -------- | ------------- |
| juan@example.com   | 123456   | Administrador |
| ana@example.com    | 123456   | Organizador   |
| carlos@example.com | 123456   | Organizador   |
| maria@example.com  | 123456   | Asistente     |
| pedro@example.com  | 123456   | Asistente     |
| laura@example.com  | 123456   | Asistente     |

## Licencia

[MIT licensed](LICENSE).
