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
									<DialogTitle as="h1" class="font-medium text-lg">Create chat</DialogTitle>
									<button class="btn-icon p-3" @click="closeModal()">
										<Icon name="ph:x" size="18" />
									</button>
								</div>
								<div></div>
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
</script>
