<template>
  <div class="videoComponent">
    <div class="videoComponent__main">
      <video ref="video" controls height="360">
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <div
        v-if="currentSubtitle"
        class="videoComponent__main-subtitles"
        id="subtitles"
      >
        {{ currentSubtitle }}
      </div>
    </div>
    <div class="videoComponent__transcript">
      <div class="videoComponent__transcript-wrap">
        <h3 class="videoComponent__transcript-heading">Transkript</h3>
        <ul class="videoComponent__transcript-list">
          <li
            v-for="subtitle in subtitles"
            :key="subtitle.id"
            :ref="'subtitle-' + subtitle.id"
            :class="
              subtitle.id == currentId
                ? 'videoComponent__transcript-list-item videoComponent__transcript-list-item--active'
                : 'videoComponent__transcript-list-item'
            "
            @click="updateTime(subtitle.id)"
          >
            <p class="videoComponent__transcript-list-item-time">
              {{ formatSeconds(subtitle.startTime) }}
            </p>
            <p class="videoComponent__transcript-list-item-text">
              {{ subtitle.text }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subtitles: {
      type: Array,
      required: true,
    },
    videoName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentSubtitle: null,
      currentId: null,
      videoSrc: require(`@/assets/videos/${this.videoName}`),
    };
  },
  watch: {
    videoName(newVideo) {
      this.videoSrc = require(`@/assets/videos/${newVideo}`);
      this.$nextTick(() => {
        this.$refs.video.load();
      });
    },

    currentId() {
      this.scrollActiveSubtitle();
    },
  },

  mounted() {
    this.$refs.video.ontimeupdate = this.updateSubtitle;
  },
  methods: {
    updateSubtitle() {
      const currentTime = this.$refs.video.currentTime;
      const current = this.subtitles.find(
        (subtitle) =>
          currentTime >= subtitle.startTime && currentTime < subtitle.endTime
      );
      this.currentSubtitle = current ? current.text : "";
      this.currentId = current ? current.id : null;
    },

    updateTime(id) {
      this.currentId = id;
      const subtitle = this.subtitles.find((subtitle) => subtitle.id === id);
      if (subtitle) {
        this.$refs.video.currentTime = subtitle.startTime;
        this.currentSubtitle = subtitle.text;
        this.$refs.video.play();
      }
    },

    scrollActiveSubtitle() {
      this.$nextTick(() => {
        const activeItem = this.$refs[`subtitle-${this.currentId}`];
        if (activeItem && activeItem.length) {
          activeItem[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    },

    formatSeconds(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
      const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

      return `${formattedMins}:${formattedSecs}`;
    },
  },
};
</script>
