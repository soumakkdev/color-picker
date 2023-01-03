/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx, ts}'],
	theme: {
		extend: {
			fontFamily: {
				code: "'Fira Code', monospace",
				body: "'Inter', sans-serif",
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
