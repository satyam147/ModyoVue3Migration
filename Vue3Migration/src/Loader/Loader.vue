<template>
  <loading
    :active="isLoading"
    :can-cancel="false"
    :loader="'spinner'"
    :is-full-page="true"
    color="#804fa0"
  />
</template>
<script lang="ts">
import Loading from 'vue-loading-overlay'

export default {
  name: 'Loader',
  components: { Loading },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style scoped lang="scss"></style>
