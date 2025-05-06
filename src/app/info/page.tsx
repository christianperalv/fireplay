export default function InfoPage() {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Información del Proyecto - Fireplay</h1>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">¿Qué es Fireplay?</h2>
          <p className="text-gray-700">
            Fireplay es una tienda online de videojuegos moderna que permite explorar, 
            buscar, guardar favoritos y simular la compra de juegos. Ofrece una experiencia 
            dinámica y adaptativa en múltiples dispositivos.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Tecnologías utilizadas</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Next.js 15 (con App Router y Server Components)</li>
            <li>React 19</li>
            <li>Tailwind CSS 4</li>
            <li>Firebase (Authentication + Firestore)</li>
            <li>API pública RAWG para videojuegos</li>
            <li>LocalStorage para gestión de carrito</li>
            <li>Progressive Web App (PWA) configuración</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-2">Objetivos del proyecto</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Aprender a utilizar Next.js 15 con React 19.</li>
            <li>Conectar Frontend y Backend usando Firebase.</li>
            <li>Diseñar una aplicación adaptativa y optimizada con Tailwind CSS.</li>
            <li>Aplicar gestión de usuarios, favoritos, carrito y navegación dinámica.</li>
            <li>Publicar la aplicación como una PWA funcional.</li>
          </ul>
        </section>
      </div>
    )
  }
  