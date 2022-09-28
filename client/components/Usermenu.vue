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
										<button
											@click="closeModal()"
											class="flex go-back items-center space-x-3 font-medium"
										>
											<Icon size="24" name="ph:caret-left-light" />
											<span>Go Back</span>
										</button>
									</TransitionChild>
								</div>
								<!-- User profile -->
								<div class="p-5 py-10 flex items-center">
									<button class="flex items-center space-x-3 text-left group">
										<img
											v-if="userHasProfile && user.profile.image"
											:src="apiUrl + user.profile.image.url"
											:alt="`${user.username}'s Image`"
											class="object-cover w-10 h-10 rounded-full"
										/>
										<span v-else class="btn-icon">
											<Icon size="24" name="ph:user" />
										</span>

										<div>
											<h2
												class="font-semibold"
												v-if="userHasProfile && user.profile.firstName && user.profile.lastName"
											>
												{{ user.profile.firstName }} {{ user.profile.lastName }}
											</h2>
											<h2 class="font-semibold" v-else>@{{ user.username }}</h2>
											<p class="text-sm">{{ user.email }}</p>
										</div>
									</button>
								</div>
								<!-- Menu options -->
								<div class="divide-y">
									<button
										@click="$refs.profile.openModal()"
										class="w-full flex items-center space-x-10 p-6 hover:bg-gray-50 transition-all"
									>
										<Icon name="ph:user-circle" size="26" class="text-gray-500" />
										<span class="grow text-left font-medium text-gray-600">Profile</span>
										<Icon name="ph:caret-right" size="20" class="text-gray-400" />
									</button>
									<button
										@click="$refs.security.openModal()"
										class="w-full flex items-center space-x-10 p-6 hover:bg-gray-50 transition-all"
									>
										<Icon name="ph:lock-key" size="26" class="text-gray-500" />
										<span class="grow text-left font-medium text-gray-600">Security</span>
										<Icon name="ph:caret-right" size="20" class="text-gray-400" />
									</button>
									<button
										@click="logout"
										class="w-full flex items-center space-x-10 p-6 hover:bg-gray-50 transition-all"
									>
										<Icon name="ant-design:logout-outlined" size="26" class="text-gray-500" />
										<span class="grow text-left font-medium text-gray-600">Logout</span>
										<Icon name="ph:caret-right" size="20" class="text-gray-400" />
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
		<!-- Profile Modal -->
		<Profile ref="profile" />
		<!-- Security Modal -->
		<Security ref="security" />
	</div>
</template>

<script setup>
	import { Dialog, TransitionChild, TransitionRoot, DialogPanel } from "@headlessui/vue";

	const open = ref(false);
	const openModal = () => (open.value = true);
	const closeModal = () => (open.value = false);

	const apiUrl = useApiUrl();
	const user = useStrapiUser();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});

	// expose functions to parent
	defineExpose({
		openModal,
		closeModal,
	});

	// bring in logout from strapi
	const { logout: leave } = useStrapiAuth();

	// logout the current User
	const logout = async () => {
		await navigateTo("/");
		leave();
	};
</script>

<style></style>
