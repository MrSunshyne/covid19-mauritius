<template>
	<div class="home">
		<OverviewSection></OverviewSection>
		<VirusProgression></VirusProgression>
		<NewCases></NewCases>
		<ChartFirstdays></ChartFirstdays>
		<ShareSection></ShareSection>
		<!--    <ChartWorldwideTrends></ChartWorldwideTrends>-->
		<FaqSection></FaqSection>
		<CreditsSection></CreditsSection>
	</div>
</template>

<script>
	import OverviewSection from "../components/overview-cards";
	import NewCases from "../components/chart-new-cases";
	import VirusProgression from "../components/chart-overview";
	import CreditsSection from "../components/credits-section";
	import FaqSection from "../components/faq-section";
	import ShareSection from "../components/share-section";
	import ChartWorldwideTrends from "../components/chart-worldwide-trends";
	import ChartFirstdays from "../components/chart-firstdays";

	export default {
		name: "home",
		components: {
			ChartFirstdays,
			ChartWorldwideTrends,
			VirusProgression,
			NewCases,
			OverviewSection,
			CreditsSection,
			ShareSection,
			FaqSection,
		},
		created() {
			this.$store.dispatch("FETCH_STATS");
		},
	};
</script>
