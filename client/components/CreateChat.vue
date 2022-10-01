<template>
	<div>
		<TransitionRoot appear :show="open" as="template">
			<Dialog :initial-focus="searchInput" as="div" @close="closeModal" class="relative">
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
					<div class="flex h-full items-center justify-center">
						<TransitionChild
							as="template"
							enter="transition-all duration-300 ease-out"
							enter-from="scale-75 opacity-0"
							leave="transition-all duration-300 ease-in"
							leave-to="scale-75 opacity-0"
						>
							<DialogPanel class="w-full p-5 max-w-md bg-white z-30 shadow rounded-xl">
								<div class="flex items-center justify-between">
									<DialogTitle as="h1" class="font-medium text-xl">Create chat</DialogTitle>
									<button class="btn-icon p-3" @click="closeModal()">
										<Icon name="ph:x" size="18" />
									</button>
								</div>
								<div class="mt-3">
									<p class="text-sm text-gray-600 mb-3">
										Search for the person you want to chat with
									</p>

									<label class="sr-only" for="search">Search for user to chat with</label>
									<input
										ref="searchInput"
										class="input"
										v-model="search"
										type="search"
										name="search_user"
										placeholder="Type here..."
									/>
								</div>
								<ul>
									<template v-for="u in usersFound" :key="u.id">
										<li>
											<button class="w-full rounded-md flex items-center">
												<div>
													<h1>{{ u.username }}</h1>
												</div>
											</button>
										</li>
									</template>
								</ul>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup>
	import {
		Dialog,
		DialogTitle,
		DialogDescription,
		TransitionChild,
		TransitionRoot,
		DialogPanel,
	} from "@headlessui/vue";

	const open = ref(false);
	const openModal = () => (open.value = true);
	const closeModal = () => (open.value = false);

	const user = useStrapiUser();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});

	// search term
	const search = ref("");
	// Search ref
	const searchInput = ref();

	// List of users found to chat with
	const usersFound = ref([]);

	// Functon used to search for users
	const findUser = async () => {
		try {
			if (!search.value || (search.value && search.value.length < 2)) return;
			const results = await useSearchUser(search.value);
			usersFound.value = results || [];
		} catch (error) {
			console.log(error);
		}
	};

	watch(search, (v) => {
		if (v) {
			findUser();
		} else {
			usersFound.value = [];
		}
	});
	// expose functions to parent
	defineExpose({
		openModal,
		closeModal,
	});
</script>
