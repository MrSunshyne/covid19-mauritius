<template>
  <div class="px-12 sm:px-0">
    <div class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-5">
      <StatCard
        :label="'Active Cases'"
        :value="17"
        :color="'red'"
        :diff="'+1'"
        :icon="'corona-icon'"
        >icon</StatCard
      >
      <StatCard
        :label="'Recovered'"
        :value="0"
        :color="'green'"
        :diff="'+0'"
        :icon="'recovered'"
        >icon</StatCard
      >
      <StatCard
        :label="'Deceased'"
        :value="1"
        :color="'gray'"
        :diff="'+0'"
        :icon="'deceased'"
        >icon</StatCard
      >
      <StatCard
        :label="'Total'"
        :value="18"
        :color="'red'"
        :diff="'0'"
        :icon="'total'"
        >icon</StatCard
      >
    </div>
  </div>
</template>

<script>
import StatCard from "./stat-card";
export default {
  components: {
    StatCard
  }
};
</script>
