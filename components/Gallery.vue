<template lang="pug">
  .gallery-wrapper(v-if="files.length > 0")
    .gallery(  v-on:click="onClick()")
      media(v-for="file, i in files" :file="file.directus_files_id"  :key="i"  v-bind:class="{active: idx === i}")
    .gallery-ui( v-if="files.length > 1" )
      .line( v-for="l, i in files" :class="{active: idx == i }" @click="idx = i" :key="i" :style="{width: `${100/files.length}%`}" ): span

</template>

<script>

import Base from './Base.vue'
import Media from './Media.vue'




export default {

  name: 'Gallery',
  extends: Base,
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  components: {
    Media
  },
  data() {
    return {
      idx: 0
    }
  },
  mounted() {
  },
  methods: {
    onClick() {
      this.idx += 1;
      if (this.idx >= this.$props.files.length) this.idx = 0;
    }
  }
}
</script>

<style lang="sass">

.gallery
  position: relative
  padding-top: 70%
  .media
    $mdspd: 0.2s
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    opacity: 0
    transition: opacity $mdspd ease
    transition-delay: $mdspd
    cursor: pointer
    &.active
      transition-delay: 0s
      opacity: 1
      z-index: 100

</style>
