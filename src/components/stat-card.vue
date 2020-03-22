<template>
  <div class="shadow p-3 flex">
    <div class="icon w-32 flex justify-center items-center">
      {{ icon }}
    </div>
    <div class="description">
      <div class="label text-gray-700 text-xl">{{ label }}</div>
      <div class="value-wrapper flex items-baseline">
        <div class="value text-gray-800 text-5xl leading-none font-bold pr-3">
          {{ value }}
        </div>
        <div class="diff">{{ diffValue }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 0
    },
    icon: {
      type: String,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    diff: {
      type: String,
      default: 0
    },
    color: {
      type: String,
      default: 0
    }
  },
  computed: {
    diffValue() {
      if (typeof this.diff == "string") {
        let sign = this.diff.slice(0, 1);
        let value = parseInt(this.diff.slice(1, this.diff.length));
        if (value == NaN) {
          return 0;
        } else {
          return value;
        }
      } else {
        return "not string";
      }
    }
  }
};
</script>
