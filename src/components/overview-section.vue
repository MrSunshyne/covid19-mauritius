<template>
  <div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        :label="'Active Cases'"
        :value="17"
        :color="'red'"
        :diff="'+1'"
        :icon="'corona'"
        >icon</StatCard
      >
      <StatCard
        :label="'Recovered'"
        :value="0"
        :color="'green'"
        :diff="'+0'"
        :icon="'corona'"
        >icon</StatCard
      >
      <StatCard
        :label="'Deceased'"
        :value="1"
        :color="'gray'"
        :diff="'+0'"
        :icon="'corona'"
        >icon</StatCard
      >
      <StatCard
        :label="'Total'"
        :value="18"
        :color="'red'"
        :diff="'0'"
        :icon="'corona'"
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
