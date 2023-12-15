/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}',
	'./node_modules/stwui/**/*.{svelte,js,ts,html}'],

	theme: {
		extend: {}
	},

	plugins: [
		require('stwui/plugin')
	],
	stwui: {
		themes:  [
			{
			   mytheme: {
				   primary: '#28ffeb',
				   default: '#E4E6EB',
				   danger: '#dc2626',
				   surface: '#ffffff',
				   background: '#F0F2F5',
				   border: '#E8E9EC',
				   hover: '#000000',
			   },
			},
			"light",
			"dark",
		 ]
	}
};

module.exports = config;
