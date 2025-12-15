# Espacio Evento - API REST

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Sistema de gestión de eventos desarrollado con NestJS, TypeORM y PostgreSQL. Permite la administración completa de eventos, inscripciones, salas, usuarios y pagos.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Autenticación y Autorización](#autenticación-y-autorización)
- [API Endpoints](#api-endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Características

- **Gestión de Eventos**: CRUD completo para crear y administrar eventos
- **Sistema de Inscripciones**: Registro de participantes con control de asistencia y estado de pago
- **Administración de Salas**: Gestión de espacios para eventos
- **Gestión de Usuarios**: Sistema de autenticación y autorización con JWT
- **Control de Pagos**: Seguimiento de pagos y transacciones
- **Datos de Prueba**: Seed para poblar la base de datos con datos iniciales
- **Control de Acceso basado en Roles**: Sistema de permisos con roles (admin, organizador, asistente)

## Tecnologías

- Backend Framework: [NestJS](https://nestjs.com/) v11.x
- Base de Datos: PostgreSQL 13
- ORM: TypeORM v0.3.26
- Autenticación: JWT (JSON Web Tokens) con Passport
- Validación: class-validator & class-transformer
- Encriptación: bcrypt
- Contenedores: Docker & Docker Compose
- Lenguaje: TypeScript 5.7.x

## Requisitos Previos

- Node.js 18+ y npm
- Docker y Docker Compose
- Git

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/mraibel/espacioevento.git
cd espacioevento
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar Nest CLI globalmente (opcional)

```bash
npm i -g @nestjs/cli
```

## Configuración

### Variables de Entorno

La aplicación utiliza las siguientes variables de entorno (configuradas en `docker-compose.yml`):

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=espacioeventodb
JWT_SECRET=e2056da2d99d51e72aa4be6193533a13
```

### Base de Datos

La base de datos PostgreSQL se levanta automáticamente con Docker Compose en el puerto **5433**.

## Uso

### Opción 1: Desarrollo Local con Docker

1. **Levantar todos los servicios** (Base de datos + API):
```bash
docker-compose up -d
```

2. **Ver logs de la aplicación**:
```bash
docker-compose logs -f app
```

3. **Detener los servicios**:
```bash
docker-compose down
```

### Opción 2: Desarrollo Local (solo BD en Docker)

1. **Levantar solo la base de datos**:
```bash
docker-compose up -d db
```

2. **Iniciar la aplicación en modo desarrollo**:
```bash
npm run start:dev
```

### Cargar Datos Iniciales

Una vez que la aplicación esté corriendo, ejecuta el seed:

```bash
GET http://localhost:3000/api/seed
```

O usando curl:
```bash
curl http://localhost:3000/api/seed
```

## Autenticación y Autorización

### Sistema de Autenticación

El proyecto implementa un sistema completo de autenticación basado en **JWT (JSON Web Tokens)** utilizando Passport.js. La autenticación se maneja a través del módulo `auth`.

#### Endpoints de Autenticación

**1. Registro de Usuario**
```http
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "password123",
  "roles": ["asistente"]
}
```

Respuesta:
```json
{
  "id_usuario": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "roles": ["asistente"],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**2. Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "id_usuario": 1,
  "nombre": "Juan",
  "correo": "juan@example.com",
  "roles": ["asistente"],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**3. Verificar Estado de Autenticación**
```http
GET /api/auth/check-status
Authorization: Bearer <token>
```

### Sistema de Roles

El sistema maneja 3 roles principales:

- **administrador**: Acceso completo al sistema
- **organizador**: Puede crear y gestionar eventos
- **asistente**: Usuario básico que puede inscribirse a eventos

Los roles se definen en `src/auth/interfaces/valid-roles.ts`:

```typescript
export enum ValidRoles {
    admin = 'administrador',
    organizer = 'organizador',
    assistant = 'asistente',
}
```

### Decorador @Auth()

El decorador `@Auth()` es el componente central del sistema de autorización. Se utiliza en los controladores para proteger rutas y restringir acceso según roles.

**Ubicación**: `src/auth/decorators/auth.decorator.ts`

#### Funcionamiento

```typescript
export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard),
    );
}
```

El decorador hace tres cosas:

1. **Aplica el decorador RoleProtected**: Almacena metadata sobre los roles permitidos
2. **Activa AuthGuard('jwt')**: Verifica que el token JWT sea válido
3. **Activa UserRoleGuard**: Verifica que el usuario tenga uno de los roles permitidos

#### Ejemplos de Uso

**Sin roles (solo requiere autenticación)**:
```typescript
@Get(':id')
@Auth()
findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
}
```
Cualquier usuario autenticado puede acceder.

**Con rol específico**:
```typescript
@Get()
@Auth(ValidRoles.admin)
findAll() {
    return this.usuariosService.findAll();
}
```
Solo usuarios con rol `administrador` pueden acceder.

**Con múltiples roles**:
```typescript
@Post()
@Auth(ValidRoles.admin, ValidRoles.organizer)
create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
}
```
Usuarios con rol `administrador` u `organizador` pueden acceder.

### Cómo Funciona el Flujo de Autenticación

1. **Usuario se registra o hace login**
   - Envía credenciales a `/api/auth/register` o `/api/auth/login`
   - El servidor valida las credenciales y genera un JWT
   - El JWT contiene el ID del usuario en el payload

2. **Usuario hace una petición protegida**
   - Incluye el token en el header: `Authorization: Bearer <token>`
   - El `AuthGuard('jwt')` intercepta la petición

3. **Validación del Token (JwtStrategy)**
   - Extrae el token del header
   - Verifica la firma del token usando `JWT_SECRET`
   - Decodifica el payload para obtener el ID del usuario
   - Busca el usuario en la base de datos
   - Si todo es válido, adjunta el usuario completo a `request.user`

4. **Validación de Roles (UserRoleGuard)**
   - Lee los roles permitidos desde la metadata (definidos en `@Auth()`)
   - Compara los roles del usuario con los roles permitidos
   - Si el usuario tiene al menos uno de los roles permitidos, permite el acceso
   - Si no, lanza un error `ForbiddenException`

### Guards Personalizados

**UserRoleGuard** (`src/auth/guards/user-role.guard.ts`):
```typescript
@Injectable()
export class UserRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
        
        if (!validRoles || validRoles.length === 0) return true;
        
        const req = context.switchToHttp().getRequest();
        const user = req.user as Usuario;
        
        if (!user) throw new BadRequestException('User not found');
        
        for (const role of user.roles) {
            if (validRoles.includes(role)) return true;
        }
        
        throw new ForbiddenException(
            `User ${user.nombre} need a valid role: [${validRoles}]`
        );
    }
}
```

### Estrategia JWT

**JwtStrategy** (`src/auth/strategies/jwt.strategy.ts`):
```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET') || 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
        const { id } = payload;
        const user = await this.userRepository.findOneBy({ id_usuario: +id });
        
        if (!user) throw new UnauthorizedException('Token not valid');
        
        return user;
    }
}
```

### Decoradores Adicionales

**@GetUser()**: Obtiene el usuario autenticado desde la request
```typescript
@Get('profile')
@Auth()
getProfile(@GetUser() user: Usuario) {
    return user;
}
```

**@RawHeaders()**: Obtiene los headers raw de la petición
```typescript
@Get('headers')
@Auth()
getHeaders(@RawHeaders() rawHeaders: string[]) {
    return rawHeaders;
}
```

## API Endpoints

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Protegido |
|--------|----------|-------------|-----------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/check-status` | Verificar estado de autenticación | Sí |

### Eventos (`/api/eventos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/eventos` | Listar todos los eventos |
| GET | `/api/eventos/:id` | Obtener un evento específico |
| POST | `/api/eventos` | Crear un nuevo evento |
| PUT | `/api/eventos/:id` | Actualizar un evento completo |
| DELETE | `/api/eventos/:id` | Eliminar un evento |

**Ejemplo de Body (POST/PUT)**:
```json
{
  "id_organizador": 1,
  "id_sala": 1,
  "nombre_evento": "Conferencia Tech 2025",
  "descripcion": "Conferencia sobre nuevas tecnologías",
  "fecha": "2025-12-15",
  "hora_inicio": "10:00",
  "hora_fin": "18:00",
  "cupos_totales": 100,
  "precio_entrada": 50.00,
  "tipo_evento": "público",
  "estado": "activo"
}
```

### Inscripciones (`/api/inscripciones`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/inscripciones` | Listar todas las inscripciones |
| GET | `/api/inscripciones/:id` | Obtener una inscripción específica |
| POST | `/api/inscripciones` | Crear una nueva inscripción |
| PUT | `/api/inscripciones/:id` | Actualizar una inscripción |
| PATCH | `/api/inscripciones/:id` | Actualizar parcialmente una inscripción |
| DELETE | `/api/inscripciones/:id` | Eliminar una inscripción |

**Ejemplo de Body (POST)**:
```json
{
  "id_evento": 1,
  "id_usuario": 2,
  "estado_pago": "pendiente",
  "asistencia": false
}
```

### Salas (`/api/salas`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/salas` | Listar todas las salas |
| GET | `/api/salas/:id` | Obtener una sala específica |
| POST | `/api/salas` | Crear una nueva sala |
| PATCH | `/api/salas/:id` | Actualizar una sala |
| DELETE | `/api/salas/:id` | Eliminar una sala |

### Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| GET | `/api/usuarios` | Listar todos los usuarios | Admin |
| GET | `/api/usuarios/:id` | Obtener un usuario específico | Autenticado |
| PATCH | `/api/usuarios/:id` | Actualizar un usuario | Autenticado |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario | Admin |

### Pagos (`/api/pagos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pagos` | Listar todos los pagos |
| GET | `/api/pagos/:id` | Obtener un pago específico |
| POST | `/api/pagos` | Registrar un nuevo pago |
| PATCH | `/api/pagos/:id` | Actualizar un pago |
| DELETE | `/api/pagos/:id` | Eliminar un pago |

### Seed (`/api/seed`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/seed` | Cargar datos de prueba |

## Estructura del Proyecto

```
espacioevento/
├── src/
│   ├── main.ts                     # Punto de entrada
│   ├── app.module.ts               # Módulo raíz
│   ├── auth/                       # Módulo de autenticación
│   │   ├── decorators/            # Decoradores personalizados (@Auth, @GetUser)
│   │   ├── guards/                # Guards de autorización (UserRoleGuard)
│   │   ├── strategies/            # Estrategias de Passport (JwtStrategy)
│   │   ├── interfaces/            # Interfaces y enums (ValidRoles, JwtPayload)
│   │   ├── auth.controller.ts     # Controlador de autenticación
│   │   ├── auth.service.ts        # Servicio de autenticación
│   │   └── auth.module.ts         # Módulo de autenticación
│   ├── eventos/                    # Módulo de eventos
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── eventos.controller.ts
│   │   ├── eventos.service.ts
│   │   └── eventos.module.ts
│   ├── inscripciones/              # Módulo de inscripciones
│   ├── salas/                      # Módulo de salas
│   ├── usuarios/                   # Módulo de usuarios
│   ├── pagos/                      # Módulo de pagos
│   └── seed/                       # Módulo de seed
└── test/                           # Tests e2e
```

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Modo desarrollo con hot-reload
npm run start              # Modo desarrollo normal

# Producción
npm run build              # Compilar proyecto
npm run start:prod         # Ejecutar en producción

# Testing
npm run test               # Tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov           # Tests con cobertura
npm run test:e2e           # Tests end-to-end

# Linting
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código
```

## Modelo de Base de Datos

### Entidades Principales

- **Eventos**: Información de eventos (nombre, fecha, hora, cupos, precio, tipo, estado)
- **Usuarios**: Datos de usuarios del sistema con roles
- **Salas**: Espacios físicos donde se realizan los eventos
- **Inscripciones**: Registro de participantes en eventos
- **Pagos**: Transacciones y pagos realizados

### Relaciones

- Un **Evento** pertenece a un **Organizador** (Usuario) y una **Sala**
- Una **Inscripción** pertenece a un **Usuario** y un **Evento**
- Un **Pago** está relacionado con una **Inscripción**

## Seguridad

- Autenticación mediante JWT con Passport
- Encriptación de contraseñas con bcrypt (10 rounds)
- Validación de datos con class-validator
- Guards personalizados para control de acceso basado en roles
- Variables de entorno para información sensible
- Tokens con expiración configurable

---

Desarrollado con NestJS
