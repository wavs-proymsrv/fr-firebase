/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Escanea todos los archivos en src con estas extensiones
    './index.html', // Añade cualquier otra ruta relevante si es necesario
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

