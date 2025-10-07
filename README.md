<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d (ejecuta contenedor en 2do plano)
```

5. Ejecutar
```
npm run start:dev
```

6. Llamar Endpoint para poblar tabla eventos
```
http://localhost:3000/seed
```

7. Ya puedes probar los EndPoints

## Stack usado
* Postgres
* Nest