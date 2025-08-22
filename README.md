# Innclod Angular - Gestión de Proyectos y Tareas

## Descripción

Esta aplicación es un sistema de gestión de proyectos y tareas desarrollado con Angular y Angular Material. Consume datos de APIs públicas para listar proyectos y tareas, e incluye funcionalidades de autenticación simulada, manejo de formularios reactivos, protección de rutas, Lazy Loading y gestión de errores.

---

## Características principales

- **Autenticación simulada**: Login y Logout con almacenamiento de sesión en `LocalStorage`.
- **Listado de proyectos**: Obtención de proyectos desde API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
- **Listado de tareas**: Visualización de tareas asociadas a cada proyecto desde API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) con Lazy Loading.
- **Creación y edición**: Formularios reactivos para crear y modificar proyectos y tareas, con validaciones.
- **Eliminación con confirmación**: Modales para confirmar eliminaciones usando Angular Material.
- **Manejo de errores**: Gestión y notificaciones de errores en peticiones HTTP.
- **Protección de rutas**: Rutas protegidas mediante Guards para usuarios autenticados.
- **Modularidad y Lazy Loading**: Arquitectura modular y optimización con carga diferida de módulos.
- **Interfaz responsiva y accesible**: Uso de Angular Material para una experiencia de usuario consistente y moderna.

---

## Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)
- [Angular CLI](https://angular.io/cli) (opcional, aunque no esencial para ejecutar)

### Pasos para ejecutar la aplicación localmente

1. Clona el repositorio:

    git clone https://github.com/sSiXx30/Innclod-angular

luego

    cd Innclod-angular


2. Instala las dependencias:

    npm install

3. Inicia el servidor de desarrollo:

    npm run start

o si tienes Angular CLI instalado:

    ng s -o


4. Abre el navegador y accede a: [http://localhost:4200](http://localhost:4200)

---

## Uso

- Desde la pantalla de login, ingresa cualquier usuario y contraseña (simulados) para iniciar sesión.
- Navega a la lista de proyectos, crea, edita o elimina proyectos mediante los botones correspondientes.
- Desde cada proyecto, accede a sus tareas y realiza las mismas operaciones de gestión.
- Usa el botón "Cerrar sesión" para salir.

---

## Estructura del proyecto

- `src/app/auth` - Módulo y componentes para autenticación.
- `src/app/projects` - Módulo y componentes para gestión de proyectos.
- `src/app/tasks` - Módulo y componentes para gestión de tareas.
- `src/app/shared` - Componentes compartidos, modales, servicios de notificaciones y manejo de errores.
- Lazy Loading aplicado para módulos de proyectos y tareas para optimizar la carga.

---


---

## Notas

- La autenticación es simulada para efectos de la prueba.
- Las operaciones de creación, actualización y eliminación simulan las respuestas HTTP dado que la API pública es de solo lectura.
- Se priorizó la modularidad, reutilización y buenas prácticas en Angular.

---

¡Gracias por revisar el proyecto!




