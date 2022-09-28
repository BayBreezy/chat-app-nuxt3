// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxtjs/strapi", "nuxt-icon"],
	tailwindcss: {
		cssPath: "~/assets/main.css",
	},
	css: ["simplebar/dist/simplebar.min.css"],
	googleFonts: {
		families: {
			Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		},
		useStylesheet: true,
		download: false,
	},
	strapi: {
		cookie: {
			maxAge: 60 * 60 * 24 * 7,
		},
		auth: {
			populate: "profile",
		},
	},
});
