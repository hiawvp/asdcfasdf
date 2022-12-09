const colors = require('tailwindcss/colors')


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [],

    theme: {
        extend: {
            colors: {
                'primary': colors.blue[700],
            }
        }
    }
}


