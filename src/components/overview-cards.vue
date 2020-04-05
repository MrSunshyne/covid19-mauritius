<template>
	<div class="px-12 pb-10 sm:px-0 container mx-auto">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" v-if="stats && vstats">
			<StatCard
				:color="'red'"
				:diff="overview.active.diff"
				:icon="'corona-icon'"
				:label="'Active Cases'"
				:value="overview.active.amt"
				title="Does not include recovered or deceased people"
				>icon
			</StatCard>

			<StatCard
				:color="'gray'"
				:diff="overview.deceased.diff"
				:icon="'deceased'"
				:label="'Deceased'"
				:value="overview.deceased.amt"
				>icon
			</StatCard>

			<StatCard
				:color="'green'"
				:diff="overview.recovered.diff"
				:icon="'recovered'"
				:label="'Recovered'"
				:value="overview.recovered.amt"
				>icon
			</StatCard>
			<StatCard
				:color="'red'"
				:diff="overview.total.diff"
				:icon="'total'"
				:label="'Total'"
				:value="overview.total.amt"
				>icon
			</StatCard>

		</div>
	</div>
</template>

<script>
	import StatCard from "./stat-card";
	import {mapGetters, mapActions} from "vuex";

	export default {
		mounted() {
			// this.FETCH_VERIFIED_STATS()
		},
		methods:{
			...mapActions(['FETCH_VERIFIED_STATS'])
		},
		components: {
			StatCard,
		},
		computed: {
			...mapGetters({
				overview: "getOverview",
				vstats: 'getVerifiedStats',
				stats: 'getStats'
			}),
		},
	};
</script>
