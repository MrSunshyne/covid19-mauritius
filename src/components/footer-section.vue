<template>
  <div
    class="container mx-auto text-sm uppercase tracking-wide py-10 flex justify-center md:justify-between"
  >
    <div>&nbsp;</div>
    <ul class="menu">
      <li>
        <a
          href="https://github.com/MrSunshyne/covid19-mauritius/"
          target="_blank"
          >Contribute on GitHub</a
        >
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
