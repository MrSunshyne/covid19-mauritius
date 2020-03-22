<template>
  <div class="px-12 pb-10 sm:px-0 container mx-auto ">
    <div class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-5">
      <StatCard
        :label="'Active Cases'"
        :value="22"
        :color="'red'"
        :diff="'+10'"
        :icon="'corona-icon'"
        title="Does not include recovered or deceased people"
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
        :value="2"
        :color="'gray'"
        :diff="'+1'"
        :icon="'deceased'"
        >icon</StatCard
      >
      <StatCard
        :label="'Total'"
        :value="24"
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
