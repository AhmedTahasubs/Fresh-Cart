import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}','index.html',flowbite.content()],
  theme: {
    container:{
      center:true,
      screens:{
        'sm': '600px',
        'md': '728px',
        'lg': '960px',
        'xl': '1220px',
        '2xl': '1380px',
      }
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
}

