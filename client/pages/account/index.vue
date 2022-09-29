<template>
	<div>
		<header class="sticky top-0 border-b border-gray-200 bg-white/50 backdrop-blur">
			<div class="h-20 lg:px-5 flex items-center justify-between">
				<button
					@click="$refs.userMenu.openModal()"
					class="flex items-center space-x-3 text-left group"
				>
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
					</div>
				</button>
				<div class="flex items-center space-x-3">
					<button @click="$refs.createChat.openModal()" class="btn-icon p-3">
						<Icon name="ph:plus" size="22" />
					</button>
					<button class="btn-icon p-3">
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
										<span class="btn-icon">
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
						<span class="p-3 btn-icon">
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
						<button class="btn-icon p-3">
							<Icon name="heroicons:ellipsis-vertical-solid" size="24" />
						</button>
					</div>
				</div>
				<!-- List of messages -->
				<SimpleBar class="grow h-full overflow-y-auto">
					<div class="p-5 space-y-3">
						<template v-for="c in 10" :key="`chatLoaded-${c}`">
							<div v-if="c % 2 === 0" class="p-2 rounded-xl max-w-[60%] bg-gray-50">
								<p class="">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, doloribus fugit
									quas dolores provident minima aspernatur. Unde assumenda sequi repellendus
									quisquam placeat optio consequuntur eius distinctio eos, pariatur cum natus?
								</p>
								<span class="text-xs inline-block mt-2">12:14PM</span>
							</div>
							<div v-else class="p-2 ml-auto rounded-xl max-w-[60%] text-white bg-primary">
								<p class="">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, doloribus fugit
									quas dolores provident minima aspernatur. Unde assumenda sequi repellendus
									quisquam placeat optio consequuntur eius distinctio eos, pariatur cum natus?
								</p>
								<span class="text-xs inline-block mt-2 text-right">12:14PM</span>
							</div>
						</template>
					</div>
				</SimpleBar>
				<!-- chat input -->
				<div class="border-t bg-white shrink-0 flex space-x-4 items-center lg:px-6 lg:py-3">
					<!-- Icon picker -->
					<Popover class="relative" v-slot="{ open }">
						<PopoverButton>
							<Icon class="text-gray-500" v-if="!open" name="heroicons:face-smile" size="28" />
							<Icon class="text-gray-500" v-else name="ph:keyboard" size="28" />
						</PopoverButton>
						<transition name="fade">
							<PopoverPanel class="absolute z-10 bg-white -top-[330px]">
								<ClientOnly>
									<EmojiPicker :native="true" @select="onSelectEmoji" />
								</ClientOnly>
							</PopoverPanel>
						</transition>
					</Popover>
					<button type="button">
						<Icon class="text-gray-500" name="ph:paperclip" size="26" />
					</button>
					<div class="grow">
						<ClientOnly>
							<resize-textarea
								:minHeight="42"
								:rows="1"
								class="input"
								:maxHeight="100"
							></resize-textarea>
						</ClientOnly>
					</div>
					<button type="button">
						<Icon class="text-gray-500" name="fluent:send-24-regular" size="26" />
					</button>
				</div>
			</div>
		</main>
		<!-- User menu slide over -->
		<Usermenu ref="userMenu" />
		<!-- Create chat modal -->
		<CreateChat ref="createChat" />
	</div>
</template>

<script setup>
	import { SimpleBar } from "simplebar-vue3";
	import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
	const user = useStrapiUser();
	const apiUrl = useApiUrl();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});

	function onSelectEmoji(emoji) {
		console.log(emoji);
	}
</script>

<style></style>
