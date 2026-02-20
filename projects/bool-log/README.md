# 📚 BookLog — Gestión de Biblioteca

Aplicación web SPA para gestionar una colección de libros. Permite añadir, visualizar y eliminar libros, con persistencia en la nube mediante Firebase Firestore.

## Descripción

BookLog es una herramienta de gestión de biblioteca personal que permite llevar un registro de libros con su título, autor, estado (disponible, prestado, retirado), número de páginas y portada. Los datos se almacenan en Firebase Firestore, por lo que están disponibles desde cualquier dispositivo.

## Tecnologías

- **React 19** + **TypeScript** — Componentes tipados y estado reactivo
- **Tailwind CSS v4** — Estilos utility-first con tema oscuro neón
- **Heroicons** — Iconos SVG del equipo de Tailwind
- **Firebase Firestore** — Base de datos NoSQL en la nube (CRUD)
- **Vite** — Bundler ultrarrápido para desarrollo y producción

## Funcionalidades

- ✅ **Create** — Formulario para añadir nuevos libros
- ✅ **Read** — Listado de libros en tarjetas responsive
- ✅ **Delete** — Eliminación con confirmación
- ✅ **Loading** — Spinner mientras se cargan los datos
- ✅ **Feedback** — Mensajes de éxito y error
- ✅ **Responsive** — Adaptado a móvil, tablet y escritorio

## Despliegue

🔗 **URL en Vercel**: [https://booklog-tau.vercel.app](https://booklog-tau.vercel.app/)

## Desarrollo local

```bash
npm install
npm run dev
```
