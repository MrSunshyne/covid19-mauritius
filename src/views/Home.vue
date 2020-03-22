<template>
  <div class="home">
    <OverviewSection></OverviewSection>
  </div>
</template>

<script>
import OverviewSection from "../components/overview-section";
export default {
  name: "home",
  components: {
    OverviewSection
  },
  created() {
    this.$store.dispatch("FETCH_STATS");
  }
};
</script>
