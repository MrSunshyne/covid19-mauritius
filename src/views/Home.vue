<template>
  <div class="home">
    <OverviewSection></OverviewSection>
    <VirusProgression></VirusProgression>
    <NewCases></NewCases>
  </div>
</template>

<script>
import OverviewSection from "../components/overview-section";
import NewCases from "../components/new-cases";
import VirusProgression from "../components/virus-progression";
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
