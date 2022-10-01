export default defineNuxtRouteMiddleware((to, _from) => {
	const user = useStrapiUser();
	if (!user.value && to.path.includes("account")) {
		return navigateTo("/");
	}
});
