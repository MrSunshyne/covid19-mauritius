<template>
  <div
    class="main-menu container mx-auto font-bold md:flex justify-center md:justify-between items-center py-3 md:py-5"
  >
    <router-link class="text-center block md:inline text-3xl" :to="'/'"
      >COVID-19 Mauritius</router-link
    >

    <ul class="flex mr-3">
      <li>
        <a href="#" target="_blank" :title="getUpdated.value"
          >Last updated: {{ getUpdated.ago }}</a
        >
      </li>
      <!--      <li><a href="#" target="_blank">Statistics →</a></li>-->
      <!--      <li><a href="#" target="_blank">About →</a></li>-->
      <!--      <li><a href="#" target="_blank">Sources →</a></li>-->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUpdated"])
  }
};
</script>

<style lang="scss" scoped>
.main-menu {
  /* @apply bg-black; */

  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      position: relative;
      button {
        margin: 10px;
      }

      a {
        padding: 10px;
        display: block;
        @apply border-2;
        text-decoration: none;
        border-color: transparent;
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

        button {
          margin: 10px;
        }
        a {
          padding: 10px;
        }
      }
    }
  }
}
</style>
