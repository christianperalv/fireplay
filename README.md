# 🎮 Fireplay

**Fireplay** es una tienda online de videojuegos desarrollada como práctica final para los módulos M7, M8 y M9 del ciclo formativo de Desarrollo de Aplicaciones Web.

Este proyecto simula una experiencia real de usuario con funcionalidades completas como autenticación, gestión de favoritos, carrito, contacto y soporte PWA.

---

## 🚀 Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/) – Auth y Firestore
- [RAWG API](https://rawg.io/apidocs) – Datos de videojuegos
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- PWA (Progressive Web App)
- Vercel para despliegue

---

## 📦 Funcionalidades implementadas

- ✅ Registro e inicio de sesión con Firebase Auth
- ✅ Rutas protegidas para usuarios autenticados
- ✅ Catálogo de juegos desde la API pública RAWG
- ✅ Página de detalle y ficha técnica
- ✅ Buscador de juegos desde la cabecera
- ✅ Filtros por rating, nombre y fecha
- ✅ Gestión de favoritos con Firestore
- ✅ Carrito de compra con LocalStorage
- ✅ Panel de usuario (`/dashboard`) con perfil y favoritos
- ✅ Formulario de contacto funcional (`/contact`)
- ✅ Página informativa (`/info`)
- ✅ Aplicación PWA instalable y usable offline

---

## 📂 Estructura principal

src/ ├── app/ → Páginas con App Router ├── components/ → Componentes reutilizables (GameCard, Header, etc.) ├── lib/ → Lógica de datos: API, Firebase ├── types/ → Tipos TypeScript para los juegos y usuario ├── public/ → Iconos e imágenes


## 🛠 Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/fireplay.git
   cd fireplay
