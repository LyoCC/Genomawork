# Desafío Técnico - Genomawork
Proyecto web de Leandro Cerna para trabajo en GenomaWork descrito en "Desafio_Tecnico_Genomawork.pdf" 

## Instalaciones necesarias
Se requieren las siguientes instalaciones para correr cada parte del proyecto.

### Instalaciones Backend
* Python 3.9 o superior
* Docker   

### Instalaciones Frontend
* Node 20 o superior (v20.11.1 usada al crear el proyecto) 

## Como ejecutar el backend y el frontend ?
Las instrucciones para cada proyecto se encuentran en sus respectivas carpetas en el archivo README.md

## Consideraciones
### Variables de entorno 
* Quiero aclarar que subir las variables de entorno a GIT esta mal, pero decidí dejarlas por las siguientes razones:
    1. Permitirá revisar el proyecto de manera más fácil ya que no será necesario crear el archivo “.env”.
    2. Al usar Docker no existe ninguna BD o API externa a la cual afecte la seguridad.

## Supuestos
Asumí lo siguiente: 

1. Poder filtrar 2 o más columnas
    - Supuse que debían ser filtradas 2 o más columnas de la tabla por un campo de texto
2. Al menos un filtro a nivel de frontend (por ejemplo, filtrar por la columna País)
    - Dado que era similar a lo anterior use un "select" para elegir el campo a filtrar y existe la opcion Todos para cumplir el punto anterior
3. El idioma de la página en español
4. Colores similares a la página de GenomaWork
5. Asumí que, como mínimo un registro de la BD debe tener el nombre y con un largo mínimo de 3 caracteres. Permitiendo mas flexibilidad en el ingreso de un nuevo lugar de comida.
    - En resumen puede existir un registro con id y un nombre de 3 caracteres como mínimo 


> **NOTA:**
> Algunas validaciones de errores fueron omitidas para no invertir tanto tiempo, así como algunos detalles visuales


