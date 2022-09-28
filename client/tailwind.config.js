const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: colors.violet[500],
					...colors.violet,
				},
			},
			fontFamily: {
				sans: ["Inter"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
