<template>
  <div class="shadow p-4 flex overflow-hidden rounded">
    <div class="icon w-12 mr-2 md:mr-4 flex justify-center items-center">
      <img
        :alt="icon"
        :src="`/images/${icon}.svg`"
        class="block w-12 h-12 md:w-12 md:h-12 object-contain"
      />
    </div>
    <div class="description">
      <div class="label text-gray-700">{{ label }}</div>
      <div class="value-wrapper flex items-baseline">
        <div
          class="value self-end text-gray-900 text-2xl md:text-3xl leading-none font-bold pr-3"
        >{{ value }}</div>
        <div class="text-gray-800 text-red-500 text-green-500 hidden"></div>
        <div
          :title="`${diff} new cases since yesterday`"
          class="diff leading-tight text-xs self-end font-bold pb-2"
          :class="`text-${color}-500`"
          v-if="diffo.show"
        >
          <span>{{ diffo.sign }}</span>
          <span>{{ diffo.abs }} since yesterday</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInt } from '@/helpers'

export default {
  props: {
    label: {
      type: String,
      default: 0
    },
    icon: {
      type: String,
      default: 'corona-icon'
    },
    value: {
      default: 0
    },
    diff: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 0
    }
  },
  computed: {
    diffo() {
      let val = getInt(this.diff)
      let abs = Math.abs(val)
      let show = abs !== 0
      let sign = val > 0 ? '+' : '-'

      return { abs, show, sign }
    }
  }
}
</script>
