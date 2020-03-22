<template>
  <div class="home">
    <OverviewSection></OverviewSection>
    <VirusProgression></VirusProgression>
    <NewCases></NewCases>
    <ShareSection></ShareSection>
    <FaqSection></FaqSection>
    <CreditsSection></CreditsSection>
  </div>
</template>

<script>
import OverviewSection from "../components/overview-section";
import NewCases from "../components/chart-new-cases";
import VirusProgression from "../components/chart-virus-progression";
import CreditsSection from "../components/credits-section";
import FaqSection from "../components/faq-section";
import ShareSection from "../components/share-section";
export default {
  name: "home",
  components: {
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
