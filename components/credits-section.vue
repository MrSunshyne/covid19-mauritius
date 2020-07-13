<template>
  <div class="built-using bg-gray-800 text-white pb-10">
    <div class="container mx-auto pt-10 block space-y-10">
      <div class="space-y-5">
        <h2 class="text-center font-bold text-xl pl-3 uppercase">Contributors</h2>

        <div class="bg-blue-100 shadow overflow-hidden sm:rounded-md">
          <ul class="grid sm:grid-cols-2 md:grid-cols-3">
            <li v-for="person in contributors" :key="person.name">
              <a
                :href="person.link"
                class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <div class="min-w-0 flex-1 flex items-center">
                    <div class="flex-shrink-0">
                      <img
                        class="h-12 w-12 rounded-full"
                        :src="`https://github.com/${person.github}.png`"
                        alt
                      />
                    </div>
                    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <div
                          class="text-sm leading-5 font-medium text-gray-800 truncate"
                        >{{ person.name }}</div>
                        <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                          <span class="truncate">{{ person.role }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class>
        <h2 class="text-center font-bold text-xl pl-3 uppercase">Tech Stack</h2>
        <div class="p-10">
          <ul>
            <li>
              <a href="https://nuxtjs.org">NuxtJS</a>
            </li>
            <li>
              <a href="https://tailwindcss.com">TailwindCSS</a>
            </li>
            <li>
              <a
                href="https://www.iconfinder.com/p/coronavirus-awareness-icons"
              >Icons from IconFinder</a>
            </li>
            <li>
              Hosted on
              <a href="https://netlify.com">Netlify</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contributors: [
        {
          name: 'Sandeep Ramgolam',
          link: 'https://sandeep.ramgolam.com',
          github: 'MrSunshyne',
          role: 'Maintainer'
        },
        {
          name: 'Cedric Poilly',
          link: 'https://github.com/cedpoilly',
          github: 'cedpoilly',
          role: 'code'
        },
        {
          name: 'Yusuf Satar (fluxy)',
          link: 'https://fluxy.net',
          github: 'fluxynet',
          role: 'code'
        },
        {
          name: 'Giovanni Jules',
          link: 'https://gophers.mu',
          github: 'JulesMike',
          role: 'Github Action'
        },
        {
          name: 'Chittesh Sham',
          link: 'https://github.com/isitlunchtimeyet',
          github: 'isitlunchtimeyet',
          role: 'Data Processing'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
