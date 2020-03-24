<template>
  <div class="home">
    <OverviewSection></OverviewSection>
    <VirusProgression></VirusProgression>
    <ChartFirstdays></ChartFirstdays>
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
import ChartFirstdays from "../components/chart-firstdays";
export default {
  name: "home",
  components: {
    ChartFirstdays,
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
