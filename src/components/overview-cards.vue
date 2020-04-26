<template>
	<div class="px-12 pb-10 container mx-auto">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" v-if="stats && vstats">
			<StatCard
				:diff="overview.active.diff"
				:icon="'corona-icon'"
				:label="'Active Cases'"
				:value="overview.active.amt"
				title="Does not include recovered or deceased people"
				>icon
			</StatCard>

			<StatCard
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
				:diff="overview.total.diff"
				:icon="'total'"
				:label="'Total'"
				:value="overview.total.amt"
				>icon
			</StatCard>
		</div>
		<div class="pt-4 text-gray-700">
			<p >
				* <span class="font-bold">{{ overview.other.amt }} patients</span> abroad for treatment are deducted from Active Cases.
			</p>
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
