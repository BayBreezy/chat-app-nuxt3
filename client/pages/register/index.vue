<template>
	<main class="min-h-screen grid grid-cols-1 md:grid-cols-12">
		<div class="col-span-full md:col-span-9 lg:col-span-5 flex items-center justify-center">
			<div class="md:p-4 w-[360px] md:w-[400px]">
				<h1 class="text-3xl font-medium">Join today</h1>
				<p class="text-gray-500 font-light mt-2">Create your account to start chatting</p>

				<VForm class="mt-10" :validationSchema="schema" @submit="submit">
					<FormInput class="mb-2" name="username" id="username" label="Username" />
					<FormInput class="mb-2" name="email" id="email" label="Email" type="email" />
					<FormInput class="mb-2" name="password" id="password" label="Password" type="password" />
					<button class="btn mt-5 w-full">Create Account</button>
				</VForm>

				<div class="my-7 flex items-center justify-center">
					<hr class="w-full" />
					<span class="mx-4">or</span>
					<hr class="w-full" />
				</div>

				<NuxtLink class="w-full btn-flat" to="/">Sign In</NuxtLink>
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
	const { register } = useStrapiAuth();

	// validation schema
	const schema = {
		email: "required|email",
		password: "required|min:6",
		username: "required|min:3",
	};

	// submit function
	const submit = async (values) => {
		try {
			await register({
				email: values.email,
				password: values.password,
				username: values.username,
			});
			await navigateTo("/account");
			notify(
				{
					group: "global",
					title: "Success",
					color: "text-green-500",
					icon: "ph:check-circle-light",
					text: "Welcome! Account created",
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
