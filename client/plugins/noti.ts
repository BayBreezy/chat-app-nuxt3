import Notifications from "notiwind";

export default defineNuxtPlugin((app) => {
	app.vueApp.use(Notifications);
});
