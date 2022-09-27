import { email, min, required } from "@vee-validate/rules";
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";

export default defineNuxtPlugin((app) => {
	app.vueApp.component("VForm", Form);
	app.vueApp.component("VField", Field);
	app.vueApp.component("VError", ErrorMessage);

	// rules
	defineRule("email", email);
	defineRule("min", min);
	defineRule("required", required);
});
