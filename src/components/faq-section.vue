<template>
  <div class="py-10 container mx-auto">
    <h2 class="text-2xl text-center font-black">FAQ</h2>
    <ul
      class="faq px-8 sm:px-0 grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <li>
        <label>What is the source ?</label>
        <p>
          Local newspapers and radio stations.
        </p>
      </li>
      <li>
        <label>When was this page last updated?</label>
        <p>Last updated: {{ getUpdated }}</p>
      </li>
      <li>
        <label>Should I trust this page?</label>
        <p>
          Kindly check websites of local news papers such as
          <a href="https://www.lexpress.mu">lexpress.mu</a>
          for trusted sources.
        </p>
      </li>
      <li>
        <label>Is this updated automatically?</label>
        <p>
          No. I update the list whenever practically possible. The data comes
          from a
          <a
            href="https://docs.google.com/spreadsheets/d/1DhrU8lCWYS_VKKQ3QOYbLzrJgHioQGQp5qPnpSNcUU8/edit?usp=sharing"
            >Google Sheet</a
          >. Anyone can submit a PR to add new charts.
          <a href="https://github.com/MrSunshyne/covid19-mauritius">here</a>.
        </p>
      </li>
      <li>
        <label>Why did you build this?</label>
        <p>
          To have a simple page where everyone can check the latest statistics.
        </p>
      </li>
      <li>
        <label
          >Are you a journalist or from the Ministry of Health and would you
          like to have access to update this page?</label
        >
        <p>
          Get in touch with me asap: san<span class="hidden"></span>dee<span
            class="hidden"
          ></span
          >p@ra<span class="hidden"></span>mgo<span class="hidden"></span
          >lam.com
        </p>
      </li>
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

<style>
label {
  @apply font-bold my-4;
}

a {
  @apply font-bold;
}
</style>
