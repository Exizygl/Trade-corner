const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4da6ff',//bleu clair
                    DEFAULT: '#0B84FF',//bleu moyen
                    dark: '#0066cc',//bleu foncé
                },
                secondary: {
                    light: '#f39e58',//orange clair
                    DEFAULT: '#ed7410',//orange foncé
                    dark: '#bf5d0d',//marron
                },
<<<<<<< HEAD
                background: {
                    light: '#f39e58',
                    DEFAULT: '#22262F',
                    dark: '#bf5d0d',
                },
=======
                purplecorner : '#53216C',
                magentacorner : '#AD09FF',
                darkgray : "#22262F",
               
            },
            fontFamily : {
                'sans': ['heebo', ...defaultTheme.fontFamily.sans],
>>>>>>> origin/addProduct

            },
           
        },

    plugins: [require('@tailwindcss/forms')],
    }
};
