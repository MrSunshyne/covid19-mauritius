<template>
  <div
    class="main-menu container mx-auto font-bold md:flex justify-center md:justify-between items-center py-3 md:py-5"
  >
    <nuxt-link :to="'/'" class="text-center block md:inline text-3xl"
      >COVID-19 Stats</nuxt-link
    >

    <ul class="flex">
      <li>
        <div>
          Last updated:
          <span :title="getUpdated.value" v-if="getUpdated">{{
            getUpdated.ago
          }}</span>
          <span v-else>loading..</span>
        </div>
      </li>
      <li>
        <nuxt-link
          :to="'/country/US'"
          class="bg-yellow-500 rounded text-sm hover:bg-yellow-600"
          >Explore</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          :to="'/free'"
          class="bg-green-400 rounded text-sm hover:bg-green-500"
          >Covid-Free Countries</nuxt-link
        >
      </li>
      <!--      <li><a href="#" target="_blank">Statistics →</a></li>-->
      <!--      <li><a href="#" target="_blank">About →</a></li>-->
      <!--      <li><a href="#" target="_blank">Sources →</a></li>-->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUpdated'])
  }
}
</script>

<style lang="scss" scoped>
.main-menu {
  /* @apply bg-black; */

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    li {
      position: relative;
      margin-bottom: 10px;
      margin-left: 10px;

      button {
        margin: 10px;
      }

      a,
      div {
        padding: 10px;
        display: inline-block;
        @apply border-2;
        text-decoration: none;
        border-color: transparent;
      }

      a {
        cursor: pointer;
      }
    }
  }
}

@screen sm {
  .main-menu {
    ul {
      li {
        padding: 10px;
        padding-right: 0;

        button {
          margin: 10px;
        }

        a,
        div {
          padding: 10px;
        }
      }
    }
  }
}
</style>
