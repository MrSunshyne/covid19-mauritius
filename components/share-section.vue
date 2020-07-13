<template>
  <div class="flex bg-gray-300 py-10">
    <div class="container mx-auto flex items-center justify-center">
      <div class="text-xl font-bold uppercase text-gray-700 px-4">
        Share this page
      </div>

      <div class="share-wrapper">
        <svg
          style="height: 0; position: absolute"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <symbol id="designernews" viewBox="0 0 16 16">
            <path
              d="M7.514 7.988c0-2.555-1.57-4.287-4.56-4.287H0v8.6h3.016c2.903 0 4.498-1.75 4.498-4.31zM5.37 8c0 1.844-.946 2.642-2.467 2.642H2.13V5.358h.773C4.36 5.358 5.37 6.193 5.37 8zM16 12.3V3.7h-1.98v4.81L10.853 3.7h-2.07v8.6h1.982V7.152l3.39 5.146H16z"
            />
          </symbol>
          <symbol id="facebook" viewBox="0 0 16 16">
            <path
              d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.476-1.195 1.176v1.54h2.39l-.31 2.416h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0"
              fill-rule="nonzero"
            />
          </symbol>
          <symbol id="hackernews" viewBox="0 0 16 16">
            <path
              d="M0 0v16h16V0H0zm8.92 8.96v3H7.25v-3l-2.75-5h1.96l1.66 3.48L9.7 3.96h1.88l-2.66 5z"
            />
          </symbol>
          <symbol id="linkedin" viewBox="0 0 16 16">
            <path
              d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51V7.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z"
              fill-rule="nonzero"
            />
          </symbol>
          <symbol id="pinterest" viewBox="0 0 16 16">
            <path
              d="M8 0C3.582 0 0 3.582 0 8c0 3.39 2.108 6.285 5.084 7.45-.07-.633-.133-1.604.028-2.295.146-.625.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.11.646-1.943 1.448-1.943.683 0 1.012.513 1.012 1.127 0 .687-.436 1.713-.662 2.664-.19.797.4 1.445 1.185 1.445 1.42 0 2.514-1.498 2.514-3.662 0-1.915-1.376-3.254-3.342-3.254-2.276 0-3.61 1.707-3.61 3.472 0 .687.263 1.424.593 1.825.066.08.075.15.057.23-.06.252-.196.796-.223.907-.035.146-.115.178-.268.107-.998-.465-1.624-1.926-1.624-3.1 0-2.524 1.834-4.84 5.287-4.84 2.774 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.977-4.153 4.977-.81 0-1.572-.422-1.833-.92l-.5 1.902c-.18.695-.667 1.566-.994 2.097.75.232 1.545.357 2.37.357 4.417 0 8-3.582 8-8s-3.583-8-8-8z"
              fill-rule="nonzero"
            />
          </symbol>
          <symbol id="reddit" viewBox="0 0 16 16">
            <path
              d="M1.473 9.368c-.04.185-.06.374-.06.566 0 2.3 2.94 4.173 6.554 4.173 3.613 0 6.553-1.872 6.553-4.173 0-.183-.02-.364-.055-.54l-.01-.022c-.013-.036-.02-.073-.02-.11-.2-.784-.745-1.497-1.533-2.072-.03-.01-.058-.026-.084-.047-.017-.013-.03-.028-.044-.043-1.198-.824-2.91-1.34-4.807-1.34-1.88 0-3.576.506-4.772 1.315-.01.012-.02.023-.033.033-.026.022-.056.04-.087.05-.805.576-1.364 1.293-1.572 2.086 0 .038-.01.077-.025.114l-.005.01zM8 13.003c-1.198 0-2.042-.26-2.58-.8-.116-.116-.116-.305 0-.422.117-.11.307-.11.424 0 .42.42 1.125.63 2.155.63 1.03 0 1.73-.2 2.15-.62.11-.11.3-.11.42 0 .11.12.11.31 0 .43-.54.54-1.38.8-2.58.8zM5.592 7.945c-.61 0-1.12.51-1.12 1.12 0 .608.51 1.102 1.12 1.102.61 0 1.103-.494 1.103-1.102 0-.61-.494-1.12-1.103-1.12zm4.83 0c-.61 0-1.12.51-1.12 1.12 0 .608.51 1.102 1.12 1.102.61 0 1.103-.494 1.103-1.102 0-.61-.494-1.12-1.103-1.12zM13.46 6.88c.693.556 1.202 1.216 1.462 1.94.3-.225.48-.578.48-.968 0-.67-.545-1.214-1.214-1.214-.267 0-.52.087-.728.243zM1.812 6.64c-.67 0-1.214.545-1.214 1.214 0 .363.16.7.43.927.268-.72.782-1.37 1.478-1.92-.202-.14-.443-.22-.694-.22zm6.155 8.067c-3.944 0-7.152-2.14-7.152-4.77 0-.183.016-.363.046-.54-.53-.33-.86-.91-.86-1.545 0-1 .82-1.812 1.82-1.812.45 0 .87.164 1.2.455 1.24-.796 2.91-1.297 4.75-1.33l1.21-3.69.27.063s.01 0 .01.002l2.82.663c.23-.533.76-.908 1.38-.908.82 0 1.49.67 1.49 1.492 0 .823-.67 1.492-1.49 1.492s-1.49-.67-1.49-1.49L9.4 2.18l-.98 2.99c1.77.07 3.37.57 4.57 1.35.33-.31.764-.48 1.225-.48 1 0 1.814.81 1.814 1.81 0 .66-.36 1.26-.92 1.58.02.17.04.33.04.5-.01 2.63-3.21 4.77-7.16 4.77zM13.43 1.893c-.494 0-.895.4-.895.894 0 .493.4.894.894.894.49 0 .89-.4.89-.89s-.4-.89-.9-.89z"
            />
          </symbol>
          <symbol id="tumblr" viewBox="0 0 16 16">
            <path
              d="M9.708 16c-3.396 0-4.687-2.504-4.687-4.274V6.498H3.403V4.432C5.83 3.557 6.412 1.368 6.55.12c.01-.086.077-.12.115-.12H9.01v4.076h3.2v2.422H8.997v4.98c.01.667.25 1.58 1.472 1.58h.067c.424-.012.994-.136 1.29-.278l.77 2.283c-.288.424-1.594.916-2.77.936h-.12z"
              fill-rule="nonzero"
            />
          </symbol>
          <symbol id="twitter" viewBox="0 0 16 16">
            <path
              d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.375-1.337.648-2.085.795-.598-.638-1.45-1.036-2.396-1.036-1.812 0-3.282 1.468-3.282 3.28 0 .258.03.51.085.75C5.152 5.39 2.733 4.084 1.114 2.1.83 2.583.67 3.147.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.416-.02-.617-.058.418 1.304 1.63 2.253 3.067 2.28-1.124.88-2.54 1.404-4.077 1.404-.265 0-.526-.015-.783-.045 1.453.93 3.178 1.474 5.032 1.474 6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425.64-.463 1.198-1.04 1.638-1.7z"
              fill-rule="nonzero"
            />
          </symbol>
          <symbol id="email" viewBox="0 0 16 11">
            <path
              d="M1.33 0h13.34L8 5 1.33 0zM16 0v11H0V0l8 6 8-6z"
              fill-rule="evenodd"
            />
          </symbol>
        </svg>

        <div class="share">
          <a
            :href="
              `https://twitter.com/intent/tweet/?url=${url}&amp;text=${description}&amp;via=${twitterHandle}`
            "
            class="button"
            style="background: #1DA1F2"
            target="_blank"
            v-if="facebook"
            >Twitter&nbsp;
            <svg
              alt="twitter"
              class="icon  icon--twitter"
              height="16"
              role="img"
              width="16"
            >
              <title>twitter</title>
              <use fill="CurrentColor" xlink:href="#twitter"></use>
            </svg>
          </a>
          <a
            :href="`https://facebook.com/sharer/sharer.php?u=${url}`"
            class="button"
            style="background: #3B5998"
            target="_blank"
            v-if="facebook"
            >facebook&nbsp;
            <svg
              alt="facebook"
              class="icon  icon--facebook"
              height="16"
              role="img"
              width="16"
            >
              <title>facebook</title>
              <use fill="CurrentColor" xlink:href="#facebook"></use>
            </svg>
          </a>
          <a
            :href="
              `https://pinterest.com/pin/create/button/?url=${url}&amp;description=${description}&amp;media=${pinterestImage}`
            "
            class="button"
            style="background: #BD081C"
            target="_blank"
            v-if="Pinterest"
            >Pinterest&nbsp;
            <svg
              alt="pinterest"
              class="icon  icon--pinterest"
              height="16"
              role="img"
              width="16"
            >
              <title>pinterest</title>
              <use fill="CurrentColor" xlink:href="#pinterest"></use>
            </svg>
          </a>
          <a
            :href="
              `https://www.linkedin.com/shareArticle?url=${url}&amp;title=${description}&amp;source=${siteTitle}&amp;mini=true`
            "
            class="button"
            style="background: #0077B5"
            target="_blank"
            v-if="LinkedIn"
            >LinkedIn&nbsp;
            <svg
              alt="linkedin"
              class="icon  icon--linkedin"
              height="16"
              role="img"
              width="16"
            >
              <title>linkedin</title>
              <use fill="CurrentColor" xlink:href="#linkedin"></use>
            </svg>
          </a>
          <a
            :href="
              `https://tumblr.com/widgets/share/tool?canonicalUrl=${url}&amp;tags=&amp;caption=${description}`
            "
            class="button"
            style="background: #36465D"
            target="_blank"
            v-if="tumblr"
            >tumblr&nbsp;
            <svg
              alt="tumblr"
              class="icon  icon--tumblr"
              height="16"
              role="img"
              width="16"
            >
              <title>tumblr</title>
              <use fill="CurrentColor" xlink:href="#tumblr"></use>
            </svg>
          </a>
          <a
            :href="
              `https://reddit.com/submit?url=${url}&amp;title=${description}&amp;resubmit=true`
            "
            class="button"
            style="background: #FF4500"
            target="_blank"
            v-if="Reddit"
            >Reddit&nbsp;
            <svg
              alt="reddit"
              class="icon  icon--reddit"
              height="16"
              role="img"
              width="16"
            >
              <title>reddit</title>
              <use fill="CurrentColor" xlink:href="#reddit"></use>
            </svg>
          </a>

          <a
            :href="
              `https://news.ycombinator.com/submitlink?u=${url}&amp;t=${description}`
            "
            class="button"
            style="background: #ff6600"
            target="_blank"
            v-if="HackerNews"
            >HackerNews&nbsp;
            <svg
              alt="hackernews"
              class="icon  icon--hackernews"
              height="16"
              role="img"
              width="16"
            >
              <title>hackernews</title>
              <use fill="CurrentColor" xlink:href="#hackernews"></use>
            </svg>
          </a>

          <a
            :href="
              `https://www.designernews.co/submit?url=${url}&amp;title=${description}`
            "
            class="button"
            style="background: #2D72D9"
            target="_blank"
            v-if="DesignerNews"
            >DesignerNews&nbsp;
            <svg
              alt="designernews"
              class="icon  icon--designernews"
              height="16"
              role="img"
              width="16"
            >
              <title>designernews</title>
              <use fill="CurrentColor" xlink:href="#designernews"></use>
            </svg>
          </a>

          <a
            :href="`mailto:?subject=${description}&amp;body=${emailBody}${url}`"
            class="button"
            style="background: true"
            target="_blank"
            v-if="Email"
            >Email&nbsp;
            <svg
              alt="email"
              class="icon  icon--email"
              height="16"
              role="img"
              width="16"
            >
              <title>email</title>
              <use fill="CurrentColor" xlink:href="#email"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facebook: true,
      Pinterest: false,
      LinkedIn: true,
      tumblr: false,
      Reddit: true,
      HackerNews: true,
      DesignerNews: false,
      Twitter: true,
      Email: true
    }
  },
  computed: {
    url() {
      if (process.client) {
        return window.location.href
      }
      return '/'
    },
    description() {
      return 'Covid19 Statistics for Mauritius'
    },
    emailBody() {
      return 'Use this tool to check the stats of Covid19 in Mauritius'
    },
    siteTitle() {
      if (process.client) {
        return document.title
      }
      return 'Covid 19 Thing TODO'
    },
    twitterHandle() {
      return '__Sun__'
    },
    pinterestImage() {
      return ''
    }
  }
}
</script>

<style>
.button {
  display: inline-block;
  padding: 0.6em 0.8em 0.7em;
  color: white;
  text-decoration: none;
  background: #111;
  /*margin-bottom: 0.2em;*/
}

.share-wrapper {
  display: grid;
  place-items: center;
}

.button svg {
  vertical-align: text-top;
  display: inline-block;
  margin-left: 2px;
}
</style>
