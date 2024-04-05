# Backend

### Tecnologias usadas
* Python 3
* FastAPI
* Uvicorn
* SQLAlchemy

## 1. Via terminal ir a la carpeta backend
Usar el terminal para acceder a la carpeta Backend, los siguientes comandos deben ejecutarse desde ahí. 

## 2. Crear y acceder al entorno virtual 
### Crear el entorno virutal
```c
//El entorno virtual debe ser creado con Python 3 
//Si se tiene ambas versiones probablemente el comando sea python3 en vez de Python
python -m venv venv
```
### Acceder al entorno virutal
```c
//En caso de usar Windows console
.\venv\Scripts\activate.bat 

//En caso de usar Windows powerShell
.\venv\Scripts\activate.ps1 
```

## 3. Instalar dependencias

```c
              
pip install -r ./requirements.txt
```
## 4. Levantar base de datos Postgres
```c
//recordar instalar previamente docker 
// https://www.docker.com/get-started/

//crear y levantar el contenedor
docker-compose up

//El mismo efecto anterior, pero para ejecutarse en segundo plano
docker-compose up -d
```
## 5. Correr backend
```c
uvicorn app.main:app
```
## Documentacion de la API
En el siguiente enlace se genera la documenentacion de la API
> **http://127.0.0.1:8000/docs**

Dado que la BD estara en blanco al iniciar, es posible generar datos de prueba al llamar el siguiente endpoint.

> **http://127.0.0.1:8000/seeds/places**


## Referencias

### Documentación necesaria
* https://fastapi.tiangolo.com/#create-it
* https://docs.pydantic.dev/latest/concepts/fields/
* https://docs.sqlalchemy.org/en/20/core/metadata.html 


### Ejemplo práctico para utilizar el ORM SQLAlchemy
Primera vez usando este ORM y era un poco confuso buscar en la documentación oficial, para ahorrar tiempo busque un ejemplo básico de funcionamiento y así orientarme

* https://github.com/gregoryvicent/backend_and_frontend_connection/blob/main/backend/crud.py
