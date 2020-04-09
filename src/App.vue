<template>
	<div class="bg-gray-200">
		<main-menu></main-menu>
		<router-view  />
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
