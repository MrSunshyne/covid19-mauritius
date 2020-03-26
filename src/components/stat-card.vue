<template>
	<div class="shadow p-4 flex">
		<div class="icon w-20 mr-2 md:mr-4 flex justify-center items-center">
			<img
				:alt="icon"
				:src="`/images/${icon}.svg`"
				class="block w-12 h-12 md:w-20 md:h-20 object-contain"
			/>
		</div>
		<div class="description">
			<div class="label text-gray-700 text-n md:text-xl">{{ label }}</div>
			<div class="value-wrapper flex items-baseline">
				<div
					class="value text-gray-800 self-end text-3xl md:text-5xl leading-none font-bold pr-3"
				>
					{{ value }}
				</div>
				<div
					:title="`${diff} new cases since yesterday`"
					class="diff leading-tight text-red-400 text-xs self-end font-bold pb-2"
					v-if="diffo.show"
				>
					<span>{{ diffo.sign }}</span>
					<span>{{ diffo.abs }} since yesterday</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getInt} from "@/helpers";

	export default {
		props: {
			label: {
				type: String,
				default: 0,
			},
			icon: {
				type: String,
				default: "corona-icon",
			},
			value: {
				type: Number,
				default: 0,
			},
			diff: {
				type: Number,
				default: 0,
			},
			color: {
				type: String,
				default: 0,
			},
		},
		computed: {
			diffo() {
				let val = getInt(this.diff);
				let abs = Math.abs(val);
				let show = abs !== 0;
				let sign = val > 0 ? "+" : "-";

				return {abs, show, sign};
			},
		},
	};
</script>
