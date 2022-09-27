<template>
	<div class="w-full">
		<label class="mb-1 inline-block font-medium" v-if="label" :for="id">{{ label }}</label>
		<VField
			validateOnInput
			:rules="rules"
			:id="id"
			:label="label"
			:placeholder="placeholder"
			:name="name"
			class="input"
			:as="as"
			:type="type"
		/>
		<span class="block mt-1 text-xs text-red-500">
			<span>&nbsp;</span>
			<transition name="fade">
				<VError :name="name" />
			</transition>
		</span>
	</div>
</template>

<script setup>
	defineProps({
		label: [String, Number],
		id: [String, Number],
		name: [String, Number],
		placeholder: [String, Number],
		rules: String,
		type: {
			type: String,
			default: "text",
		},
		as: {
			type: String,
			default: "input",
		},
	});
</script>
