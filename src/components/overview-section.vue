<template>
  <div class="px-12 pb-10 sm:px-0 container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        :label="'Active Cases'"
        :value="overview.active.amt"
        :color="'red'"
        :diff="overview.active.diff"
        :icon="'corona-icon'"
      >icon</StatCard>
      <StatCard
        :label="'Recovered'"
        :value="overview.recovered.amt"
        :color="'green'"
        :diff="overview.recovered.diff"
        :icon="'recovered'"
      >icon</StatCard>
      <StatCard
        :label="'Deceased'"
        :value="overview.deceased.amt"
        :color="'gray'"
        :diff="overview.deceased.diff"
        :icon="'deceased'"
      >icon</StatCard>
      <StatCard
        :label="'Total'"
        :value="overview.total.amt"
        :color="'red'"
        :diff="overview.total.diff"
        :icon="'total'"
      >icon</StatCard>
    </div>
  </div>
</template>

<script>
import StatCard from "./stat-card";
import { mapGetters } from "vuex";

export default {
  components: {
    StatCard
  },
  computed: {
    ...mapGetters({
      overview: "getOverview"
    })
  }
};
</script>