<template>
  <button
    :class="[
      'button',
      {
        'button--primary': variation === 'primary',
        'button--secondary': variation === 'secondary',
      },
    ]"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    variation: {
      type: String,
      required: true,
    },
  },
};
</script>
