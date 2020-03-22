<template>
  <div class="home">
    <OverviewSection></OverviewSection>
    <VirusProgression></VirusProgression>
    <NewCases></NewCases>
  </div>
</template>

<script>
import OverviewSection from "../components/overview-section";
import NewCases from "../components/chart-new-cases";
import VirusProgression from "../components/chart-virus-progression";
export default {
  name: "home",
  components: {
    VirusProgression,
    NewCases,
    OverviewSection
  },
  created() {
    this.$store.dispatch("FETCH_STATS");
  }
};
</script>
