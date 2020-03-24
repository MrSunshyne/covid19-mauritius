<template>
  <div class="home">
    <OverviewSection></OverviewSection>
    <VirusProgression></VirusProgression>
    <NewCases></NewCases>
    <ChartAll></ChartAll>
    <ShareSection></ShareSection>
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
import ChartAll from "../components/chart-all";
export default {
  name: "home",
  components: {
    ChartAll,
    VirusProgression,
    NewCases,
    OverviewSection,
    CreditsSection,
    ShareSection,
    FaqSection
  },
  created() {
    this.$store.dispatch("FETCH_STATS");
  }
};
</script>
