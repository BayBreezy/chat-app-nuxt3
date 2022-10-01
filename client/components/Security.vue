<template>
	<div>
		<TransitionRoot appear :show="open" as="template">
			<Dialog as="div" @close="closeModal" class="relative">
				<!-- Overlay -->
				<TransitionChild
					as="template"
					enter="transition-all duration-300 ease-out"
					enter-from="opacity-0"
					leave="transition-all duration-300 ease-in"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/20" />
				</TransitionChild>

				<!-- Scrollable container -->
				<div class="fixed inset-0 overflow-y-auto">
					<!-- Container used to position the content -->
					<div class="flex h-full">
						<TransitionChild
							as="template"
							enter="transition-all duration-300 ease-out"
							enter-from="-translate-x-full"
							leave="transition-all duration-300 ease-in"
							leave-to="-translate-x-full"
						>
							<DialogPanel class="w-[350px] max-w-md h-full bg-white z-30 shadow border-r">
								<!-- Back button -->
								<div class="p-5">
									<TransitionChild
										as="template"
										:appear="true"
										enter="transition-all duration-1000 ease-out"
										enter-from="-translate-x-full"
										leave="transition-all ease-in"
										leave-to="-translate-x-full"
									>
										<button @click="closeModal()" class="flex items-center space-x-3 font-medium">
											<Icon size="24" name="ph:caret-left-light" />
											<span>Go Back</span>
										</button>
									</TransitionChild>
								</div>

								<!-- Form data -->
								<div class="p-5 mt-10">
									<TransitionChild
										as="template"
										:appear="true"
										enter="transition-all duration-1000 ease-out"
										enter-from="-translate-x-10"
										leave="transition-all ease-in"
										leave-to="-translate-x-10"
									>
										<VForm :initialValues="initValues" @submit="submit">
											<FormInput rules="required|email" name="email" label="Email" id="email" />
											<FormInput
												rules="min:6"
												type="password"
												name="currentPassword"
												label="Current Password(Optional)"
												id="currentPassword"
											/>
											<FormInput
												rules="min:6"
												type="password"
												name="password"
												label="New Password(Optional)"
												id="password"
											/>
											<button class="btn text-sm">Submit</button>
										</VForm>
									</TransitionChild>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup>
	import { Dialog, TransitionChild, TransitionRoot, DialogPanel } from "@headlessui/vue";

	const { update } = useStrapi();
	const client = useStrapiClient();

	const open = ref(false);
	const openModal = () => (open.value = true);
	const closeModal = () => (open.value = false);

	const user = useStrapiUser();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});
	const initValues = computed(() => {
		return { email: user.value.email };
	});

	// expose functions to parent
	defineExpose({
		openModal,
		closeModal,
	});

	async function submit(values, { resetForm }) {
		try {
			// update email
			await client(`users/${user.value.id}`, {
				body: { email: values.email },
				method: "PUT",
			});
			useNotify()(
				{
					group: "global",
					title: "Success",
					color: "text-green-500",
					icon: "ph:check-circle-light",
					text: "Email updated",
				},
				7000
			);

			if (values.currentPassword && values.password) {
				await client("auth/change-password", {
					method: "POST",
					body: {
						currentPassword: values.currentPassword,
						password: values.password,
						passwordConfirmation: values.password,
					},
				});
				useNotify()(
					{
						group: "global",
						title: "Success",
						color: "text-green-500",
						icon: "ph:check-circle-light",
						text: "Password updated",
					},
					7000
				);
			}

			// Update the user after
			await useUpdateCurrentUser();
			//Feedback

			resetForm();
		} catch (error) {
			useNotify()(
				{
					group: "global",
					title: "Error",
					color: "text-red-500",
					icon: "ph:x-circle",
					text: error.error?.message || "Try again",
				},
				7000
			);
		}
	}
</script>

<style></style>
