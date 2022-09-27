<template>
	<div>
		<NotificationGroup group="global">
			<div class="absolute z-50 inset-0 flex items-start justify-end p-6 pointer-events-none">
				<div class="w-full max-w-sm">
					<Notification
						v-slot="{ notifications, close }"
						enter="ease-in duration-300 transition-all"
						enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
						leave="transition-all ease-out duration-300"
						move="transition-all duration-300"
						move-delay="delay-300"
					>
						<div
							@click="close(notification.id)"
							class="flex z-50 w-full max-w-sm mx-auto px-4 py-3 space-x-3 pointer-events-auto cursor-pointer overflow-hidden bg-white rounded-lg shadow-md"
							v-for="notification in notifications"
							:key="notification.id"
						>
							<div class="" v-if="notification.icon" :class="[notification.color]">
								<Icon size="24" class="fill-current" :name="notification.icon" />
							</div>

							<div class="">
								<div class="">
									<span :class="[notification.color]" class="font-semibold">{{
										notification.title
									}}</span>
									<p class="text-sm text-gray-600">{{ notification.text }}</p>
								</div>
							</div>
						</div>
					</Notification>
				</div>
			</div>
		</NotificationGroup>
	</div>
</template>
