# Espacio Evento - API REST

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

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
