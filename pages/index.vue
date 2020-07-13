<template>
  <div class="home">
    <OverviewSection></OverviewSection>
    <VirusProgression></VirusProgression>
    <NewCases></NewCases>
    <ChartFirstdays></ChartFirstdays>
    <ShareSection></ShareSection>
    <ChartWorldwideTrends></ChartWorldwideTrends>
    <FaqSection></FaqSection>
    <CreditsSection></CreditsSection>
    <ExploreSection></ExploreSection>
  </div>
</template>

<script>
import OverviewSection from '../components/overview-cards'
import NewCases from '../components/chart-cases-daily'
import VirusProgression from '../components/chart-overview'
import CreditsSection from '../components/explore-section'
import ExploreSection from '../components/credits-section'
import FaqSection from '../components/faq-section'
import ShareSection from '../components/share-section'
import ChartWorldwideTrends from '../components/chart-worldwide-trends'
import ChartFirstdays from '../components/chart-firstdays'

export default {
  name: 'home',
  components: {
    ChartFirstdays,
    ChartWorldwideTrends,
    VirusProgression,
    NewCases,
    OverviewSection,
    CreditsSection,
    ExploreSection,
    ShareSection,
    FaqSection
  },
  created() {
    this.$store.dispatch('FETCH_STATS')
    // this.$store.dispatch("FETCH_VERIFIED_STATS");
    this.$store.dispatch('FETCH_TIMESERIES')
  },
  head() {
    return {
      title:
        'COVID-19 Mauritius Statistics | Explore Interactive COVID-19 Data',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Statistics on the cases of COVID 19 in Mauritius. Find updated information about the latest numbers of coronavirus in Mauritius and around the world'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://covid19.ramgolam.com/og-image.jpg'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'covid19, mauritius, numbers, graph, coronavirus mauritius, ile maurice'
        }
      ]
    }
  }
}
</script>
