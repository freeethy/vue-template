/**
<roll
  :key="'roll-' + totalProgress"
  :progress="totalProgress"
  :size="60"
  bg="currentColor"
/>
*/
<template>
  <div
    class="roll"
    :style="{
      width: size + 'px',
      height: size + 'px',
      transform: `scale(${scale})`
    }"
  >
    <svg width="100%" height="100%">
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        stroke-width="10%"
        stroke="currentColor"
        opacity="0.4"
        fill="none"
      ></circle>
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        stroke-width="10%"
        stroke="currentColor"
        fill="none"
        :transform="`matrix(0,-1,1,0,0,${size})`"
        stroke-dasharray="0, 99999"
        :stroke-linecap="progress > 0 ? 'round' : ''"
      ></circle>
    </svg>
    <span class="text" :style="{ color: bg }">{{ progress }}%</span>
  </div>
</template>
<script>
export default {
  name: "roll",

  props: {
    bg: {
      type: String,
      default: "#ABC270"
    },
    size: {
      type: Number,
      default: 72
    },
    scale: {
      type: Number,
      default: 1
    },
    progress: {
      default: 50
    }
  },

  mounted() {
    var circle = this.$el.querySelectorAll("circle")[1];

    setTimeout(() => {
      if (circle) {
        var percent = this.progress / 100,
          perimeter = Math.PI * circle.getBoundingClientRect().height;
        circle.setAttribute(
          "stroke-dasharray",
          perimeter * percent + ", " + perimeter * (1 - percent)
        );
      }
    }, 200);
  }
};
</script>
<style lang="scss" scoped>
.roll {
  position: relative;
  circle {
    transition: stroke-dasharray 0.5s;
  }
  .text {
    font-size: px2vw(16);
    text-align: center;
    font-weight: 500;
    @include abs-center();
  }
}
</style>
