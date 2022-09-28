import ResizeTextarea from "resize-textarea-vue3";

export default defineNuxtPlugin((app) => {
	app.vueApp.use(ResizeTextarea);
});
