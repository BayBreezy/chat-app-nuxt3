<template>
	<div>
		<header class="sticky top-0 border-b border-gray-200 bg-white/50 backdrop-blur">
			<div class="h-20 lg:px-5 flex items-center justify-between">
				<button class="flex items-center space-x-3 text-left group">
					<img
						v-if="userHasProfile && user.profile.image"
						:src="user.profile.image.url"
						:alt="`${user.username}'s Image`"
					/>
					<span
						v-else
						class="p-4 rounded-full bg-gray-100 inline-flex group-hover:bg-gray-200 transition-all"
					>
						<Icon size="24" name="ph:user" />
					</span>
					<div>
						<h2 class="font-semibold" v-if="userHasProfile">
							{{ user.profile.firstName }} {{ user.profile.firstName }}
						</h2>
						<h2 class="font-semibold" v-else>@{{ user.username }}</h2>
						<p class="text-sm">{{ user.email }}</p>
					</div>
					<span>
						<Icon name="ph:caret-down-light" />
					</span>
				</button>
				<div class="flex items-center">
					<button class="bg-gray-100 p-3 rounded-full inline-flex hover:bg-gray-200 transition-all">
						<Icon name="ph:bell" size="22" />
					</button>
				</div>
			</div>
		</header>
		<main class="h-[calc(100vh-76px)] w-full flex">
			<div class="lg:w-[350px] shrink-0 h-full border-r">
				<SimpleBar :options="{ autoHide: true }" class="h-full w-full overflow-y-auto">
					<div>
						<!-- Search input -->
						<div class="sticky top-0 bg-white p-3 z-10">
							<input
								placeholder="Search chat or user"
								class="input"
								type="search"
								name="search"
								id="search"
							/>
						</div>

						<ul class="p-3">
							<template v-for="c in 25" :key="`chat-${c}`">
								<li class="border-b border-gray-100 hover:bg-gray-50">
									<button class="flex items-center space-x-3 text-left group w-full py-3 pr-3">
										<span
											class="p-4 rounded-full bg-gray-100 inline-flex group-hover:bg-gray-200 transition-all"
										>
											<Icon size="24" name="ph:user" />
										</span>
										<div class="grow">
											<h2 class="font-semibold text-sm" v-if="userHasProfile">
												{{ user.profile.firstName }} {{ user.profile.firstName }}
											</h2>
											<h2 class="font-semibold" v-else>@{{ user.username }}</h2>
											<p class="text-sm line-clamp-1">
												<Icon class="text-green-500 mr-2" name="ph:check-circle" /><span
													>Hey there</span
												>
											</p>
										</div>
										<div class="text-right">
											<p class="text-xs">7:50PM</p>
											<span class="opacity-0 group-hover:opacity-100">
												<Icon name="ph:caret-down-light" />
											</span>
										</div>
									</button>
								</li>
							</template>
						</ul>
					</div>
				</SimpleBar>
			</div>
			<div class="grow h-full flex flex-col">
				<!-- Chat header -->
				<div class="h-16 shadow shrink-0 flex items-center px-4 justify-between">
					<button class="inline-flex items-center space-x-3 text-left group">
						<span
							class="p-3 rounded-full bg-gray-100 inline-flex group-hover:bg-gray-200 transition-all"
						>
							<Icon size="22" name="ph:user" />
						</span>
						<div class="grow">
							<h2 class="font-semibold text-sm" v-if="userHasProfile">
								{{ user.profile.firstName }} {{ user.profile.firstName }}
							</h2>
							<h2 class="font-semibold" v-else>@{{ user.username }}</h2>
						</div>
					</button>
					<div class="flex items-center">
						<button>
							<Icon name="heroicons:ellipsis-vertical-solid" size="24" />
						</button>
					</div>
				</div>
				<!-- List of messages -->
				<SimpleBar class="grow h-full overflow-y-auto">
					<div class="p-5 space-y-2">
						<template v-for="c in 50" :key="`chatLoaded-${c}`">
							<div class="p-2 rounded-xl max-w-[60%] shadow bg-white">
								<p class="text-sm">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, doloribus fugit
									quas dolores provident minima aspernatur. Unde assumenda sequi repellendus
									quisquam placeat optio consequuntur eius distinctio eos, pariatur cum natus?
								</p>
								<span class="text-xs">12:14PM</span>
							</div>
						</template>
					</div>
				</SimpleBar>
				<!-- chat input -->
				<div class="h-16 border-t bg-orange-200 shrink-0">
					<Popover class="relative" v-slot="{ open }">
						<PopoverButton>
							<Icon v-if="!open" name="heroicons:face-smile" size="24" />
							<Icon v-else name="ph:keyboard" size="24" />
						</PopoverButton>
						<transition name="fade">
							<PopoverPanel class="absolute z-10 bg-white -top-[330px]">
								<ClientOnly>
									<EmojiPicker :native="true" @select="onSelectEmoji" />
								</ClientOnly>
							</PopoverPanel>
						</transition>
					</Popover>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
	import { SimpleBar } from "simplebar-vue3";
	import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
	const user = useStrapiUser();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});

	function onSelectEmoji(emoji) {
		console.log(emoji);
	}
</script>

<style></style>
