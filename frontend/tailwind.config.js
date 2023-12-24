module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html',"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
    theme: {
        // fontFamily: {
        //     sans:['Montserrat', 'sans-serif']
        // },
        extend: {
            fontFamily:{
                quicksand: ["Quicksand"],
                jakartaSans : ["Plus Jakarta Sans"],
               
            },
        
            boxShadow:{
                custom: '0px 10px 20px 0px rgba(0, 0, 0, 0.15)',
                inset: 'inset 0px 10px 20px 0px rgba(0, 0, 0, 0.15)',
            },
            colors: {
                primary: {
                    light: '#4da6ff',
                    DEFAULT: '#0B84FF',
                    dark: '#0066cc',
                },
                secondary: {
                    light: '#f39e58',
                    DEFAULT: '#ed7410',
                    dark: '#bf5d0d',
                },
                "green-afpa": {
                    DEFAULT : '#87bb34',
                    alert: '#44a33d'
                },
                "rose-afpa": {
                    DEFAULT : '#e3007e',
                    light : "rgb(227, 0, 126, 0.1)"
                },
                "grey-afpa":{
                    DEFAULT: '#898989',
                    mid: '#e6e6e6',
                    light: '#f1f1f1',
                    dark: '#333333'
                },
                "red-alert": {
                    DEFAULT: '#f87171',
                    dark: '#b45454'
                },

                "red-icon": {
                    DEFAULT: '#cd5d5d',
                    
                },
                "green-alert": {
                    DEFAULT: '#44a33d',
                },
                "dark-afpa": {
                    DEFAULT: '#333333'
                }

            },
        },
    },
    plugins: [],
};
