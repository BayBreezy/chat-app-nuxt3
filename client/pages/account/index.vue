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
				<SimpleBar :options="{ autoHide: false }" class="h-full w-full overflow-y-auto">
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
			<div class="grow h-full"></div>
		</main>
	</div>
</template>

<script setup>
	import { SimpleBar } from "simplebar-vue3";
	const user = useStrapiUser();
	const userHasProfile = computed(() => {
		return !!user.value.profile;
	});
</script>

<style></style>
