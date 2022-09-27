<template>
	<main class="min-h-screen grid grid-cols-1 md:grid-cols-12">
		<div class="col-span-full md:col-span-9 lg:col-span-5 flex items-center justify-center">
			<div class="md:p-4 w-[360px] md:w-[400px]">
				<h1 class="text-3xl font-medium">Welcome back</h1>
				<p class="text-gray-500 font-light mt-2">Enter your credentials to get started</p>

				<VForm class="mt-10" :validationSchema="schema" @submit="submit">
					<FormInput class="mb-2" name="email" id="email" label="Email" type="email" />
					<FormInput name="password" id="password" label="Password" type="password" />
					<button class="btn mt-5 w-full">Sign Up</button>
				</VForm>

				<div class="my-7 flex items-center justify-center">
					<hr class="w-full" />
					<span class="mx-4">or</span>
					<hr class="w-full" />
				</div>

				<NuxtLink class="w-full btn-flat" to="/register">Create Account</NuxtLink>
			</div>
		</div>
		<div class="hidden md:block min-h-screen md:col-span-3 lg:col-span-7">
			<img
				src="https://images.pexels.com/photos/3826328/pexels-photo-3826328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt="Auth Image"
				class="object-cover h-screen w-full"
			/>
		</div>
	</main>
</template>

<script setup>
	import { notify } from "notiwind";
	//Bring in login function from strapi
	const { login } = useStrapiAuth();

	// validation schema
	const schema = {
		email: "required|email",
		password: "required|min:6",
	};

	// submit function
	const submit = async (values) => {
		try {
			await login({ identifier: values.email, password: values.password });
			await navigateTo("/account");
			notify(
				{
					group: "global",
					title: "Logged In",
					color: "text-green-500",
					icon: "ph:check-circle-light",
					text: "Welcome back",
				},
				7000
			);
		} catch (e) {
			notify(
				{
					group: "global",
					title: "Error",
					color: "text-red-500",
					icon: "ph:x-circle-light",
					text: e.error ? e.error.message : e.toString(),
				},
				7000
			);
		}
	};
</script>
