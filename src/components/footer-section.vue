

<template>
	<div
		class="container mx-auto text-sm uppercase tracking-wide py-10 flex justify-center md:justify-between"
	>
		<div>&nbsp;</div>
		<ul class="menu">
			<li>
				<router-link to="{}">Contribute on GitHub</router-link>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.menu {
	display: flex;

	a {
		@apply pl-2;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
