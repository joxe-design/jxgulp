# Joxe Gulp Starter 0.1

jxGulp starter es mi Work Environment (Entorno de trabajo) con Gulp, Node, Sass, SourceMaps, Browser-Sync, Autoprefixer y Uglify / Concat basado en jlGulp de <a href:"http://joellongie.com">Joel Longie</a>

## Instalar Paquetes

Después de la clonación del proyecto para el equipo ejecute el siguiente comando en su terminal para instalar todos los paquetes de nodo y Bower requeridos.

	1.  sudo npm install && bower install


## Start

	gulp

## Dist

Crea una carpeta de distribución con el siguiente comando:

	gulp dist

## Testear la distribución

Servidor de prueba para la versión final que se subirá al servidor definitivo:

	gulp dist:test

---------------------------------------

## gulpfile.js
Concatenación Javascript se realiza en el objeto de configuración en el guilpfile. Este controla el orden, así como archivos que se pueden concatenar. Fui con un sistema simple en previsión de ES6 módulos integrados. El objeto de configuración también controla qué archivos se excluyen de la versión final.

## .bowerrc
Controla la ubicación donde se instalarán los paquetes de Bower.
