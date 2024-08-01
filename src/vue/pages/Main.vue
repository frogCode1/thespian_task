<template>
  <section class="mainSection">
    <Video :videoName="videoName" :subtitles="subtitles"></Video>
    <div class="mainSection__buttons">
      <Button
        @click="changeVideo('clip_1.mp4', true)"
        text="Clip 1"
        variation="primary"
      ></Button>
      <Button
        @click="changeVideo('clip_2.mp4', false)"
        text="Clip 2"
        variation="secondary"
      ></Button>
    </div>
  </section>
</template>

<script>
import captions1 from "@/assets/captions/captions_1.srt";
import captions2 from "@/assets/captions/captions_2.srt";
import Video from "../components/Video.vue";
import Button from "../components/Button.vue";

export default {
  components: {
    Video,
    Button,
  },
  data() {
    return {
      subtitles: [],
      defaultVideo: true,
      videoName: "clip_1.mp4",
    };
  },
  mounted() {
    this.loadSubtitles(captions1);
  },
  methods: {
    loadSubtitles(captions) {
      const srtText = captions;
      this.parseSRT(srtText);
    },

    parseSRT(srtText) {
      const srtRegex =
        /^(\d+)\s*\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\s*\n([\s\S]*?)(?=\n{2}|\r?\n\r?\n|\r|\n*$)/gm;
      const matches = Array.from(srtText.matchAll(srtRegex));

      this.subtitles = matches.map((match) => ({
        id: parseInt(match[1]),
        startTime: this.parseTime(match[2]),
        endTime: this.parseTime(match[3]),
        text: match[4].trim().replace(/\n/g, "<br>"),
      }));
    },

    parseTime(srtTime) {
      const [hours, minutes, seconds] = srtTime.split(":");
      const [secs, millis] = seconds.split(",");
      return (
        parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseInt(secs) +
        parseInt(millis) / 1000
      );
    },

    changeVideo(videoName, state) {
      this.videoName = videoName;

      if (state) {
        this.loadSubtitles(captions1);
      } else if (!state) {
        this.loadSubtitles(captions2);
      }
    },
  },
};
</script>
