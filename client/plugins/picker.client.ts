import EmojiPicker from "vue3-emoji-picker";
// import css
import "../node_modules/vue3-emoji-picker/dist/style.css";
export default defineNuxtPlugin((app) => {
	app.vueApp.component("EmojiPicker", EmojiPicker);
});
