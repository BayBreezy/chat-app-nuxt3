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
					<div class="fixed inset-0 bg-black/40" />
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

								<!-- Upload profile image -->
								<div v-bind="getRootProps()">
									<input v-bind="getInputProps()" />

									<TransitionChild
										as="template"
										:appear="true"
										enter="transition-all duration-500 ease-out"
										enter-from="scale-0"
										leave="transition-all ease-in"
										leave-to="scale-0"
									>
										<img
											v-if="userHasProfile && user.profile.image"
											:src="apiUrl + user.profile.image.url"
											:alt="`${user.username}'s Image`"
											class="object-cover w-40 h-40 rounded-full mx-auto border cursor-pointer"
										/>
										<div
											v-else
											class="w-40 h-40 mx-auto cursor-pointer bg-gray-100 rounded-full flex justify-center items-center"
										>
											<p class="text-sm">Click to change photo</p>
										</div>
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
										<VForm :initialValues="initProfileValues" @submit="submit">
											<FormInput name="firstName" label="First name" id="firstName" />
											<FormInput name="lastName" label="Last name" id="lastName" />
											<FormInput name="bio" label="Bio" id="bio" as="textarea" />
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
	import { useDropzone } from "vue3-dropzone";

	const apiUrl = useApiUrl();
	const user = useStrapiUser();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});
	const initProfileValues = computed(() => {
		return user.value.profile;
	});
	const { delete: _delete, create, update } = useStrapi4();
	const client = useStrapiClient();

	async function createProfile() {
		try {
			await create("profiles", {
				user: user.value.id,
			});
			// Update the user after
			await useUpdateCurrentUser();
		} catch (error) {
			console.log(error);
		}
	}

	async function onDrop(acceptFiles, rejectReasons) {
		if (!acceptFiles.length) return;
		// check if the logged in user has a profile created
		if (userHasProfile.value) {
			// check if there is an image & remove it
			if (user.value.profile.image) {
				// remove the old image
				await client(`upload/files/${user.value.profile.image.id}`, { method: "DELETE" });
			}
		} else {
			// Create a profile for the user
			await createProfile();
		}

		// Updload the new image
		let fd = new FormData();
		fd.append("files", acceptFiles[0]);
		fd.append("refId", user.value.profile.id);
		fd.append("ref", "api::profile.profile");
		fd.append("field", "image");

		await client("/upload", {
			method: "POST",
			body: fd,
		});
		// Update the user after
		await useUpdateCurrentUser();
	}

	async function submit(values) {
		const updateValues = {
			bio: values.bio,
			firstName: values.firstName,
			lastName: values.lastName,
		};
		if (!userHasProfile.value) {
			// Create a profile for the user
			await create("profiles", {
				user: user.value.id,
				...updateValues,
			});
		} else {
			// update profile
			await update("profiles", user.value.profile.id, {
				...updateValues,
			});
		}
		// Update the user after
		await useUpdateCurrentUser();
		//Feedback
		useNotify()(
			{
				group: "global",
				title: "Success",
				color: "text-green-500",
				icon: "ph:check-circle-light",
				text: "Profile updated",
			},
			7000
		);
	}

	//Get drop zone options configured
	const {
		getRootProps,
		getInputProps,
		open: openFile,
		isDragActive,
		...rest
	} = useDropzone({ onDrop, accept: ".jpg,.png,.jpeg", multiple: false, maxFiles: 1 });

	const open = ref(false);
	const openModal = () => (open.value = true);
	const closeModal = () => (open.value = false);

	// expose functions to parent
	defineExpose({
		openModal,
		closeModal,
	});
</script>

<style></style>
