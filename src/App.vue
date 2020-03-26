<template>
	<div class="flex min-h-screen flex-col bg-gray-200">
		<main-menu></main-menu>
		<router-view class="flex-grow" />
		<footer-section />
	</div>
</template>

<script>
	import MainMenu from "./components/main-menu.vue";
	import FooterSection from "./components/footer-section.vue";

	export default {
		components: {
			MainMenu,
			FooterSection,
		},
	};
</script>

<style lang="scss">
	* {
		padding: 0;
		border: 0;
		margin: 0;
	}
</style>
