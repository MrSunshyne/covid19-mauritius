<template>
	<div class="built-using bg-gray-800 text-white pb-10">
		<div class="container mx-auto pt-10 block md:flex text-center">
			<div class="sm:w-1/2">
				<h2>Contributors</h2>
				<ul class="py-5">
					<li>
						<a href="https://sandeep.ramgolam.com">Sandeep Ramgolam</a> - Code
					</li>
					<li>
						<a href="https://cedpoilly.me" target="_blank" rel="noopener"
							>Cedric Poilly</a
						>
						- Code
					</li>
					<li>
						<a href="https://www.fluxy.net" target="_blank" rel="noopener"
							>Yusuf Satar (fluxy)</a
						>
						- Code
					</li>
					<li><a href="#">Chittesh Sham</a> - Data Processing</li>
				</ul>
			</div>
			<div class="sm:w-1/2">
				<h2>Tech</h2>
				<ul class="py-5">
					<li>
						<a href="https://vuejs.org">VueJS</a>
					</li>
					<li>
						<a href="https://tailwindcss.com">TailwindCSS</a>
					</li>
					<li>
						<a href="https://www.iconfinder.com/p/coronavirus-awareness-icons"
							>Icons from IconFinder</a
						>
					</li>
					<li>
						Hosted on
						<a href="https://netlify.com">Netlify</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
	h2 {
		@apply font-bold text-xl pl-3 uppercase;
	}
	li {
		margin: 0 15px;
		@apply text-gray-100;
	}
</style>
