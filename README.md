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

