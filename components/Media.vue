<template lang="pug">
  .media.relative(v-bind:class="{video: is('video'), image: is('image') }")
    //- video-player( v-if="is('video')" ref="video" :options="options.videoOptions" :file="file" )
    dynamic-image(  v-if="is('image')" ref="image" :file="file" )
    slot
</template>

<script>

import Base from './Base.vue'
// import VideoPlayer from './VideoPlayer.vue'
import DynamicImage from './DynamicImage.vue'




export default {

  name: 'Media',
  extends: Base,
  props: {
    file: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
          videoOptions: {
            autoplay: false,
            volume: 0,
            loop: true,
            posterSizeLimit: 1200,
            vimeoColor: 'FFFFFF',
            sizeRatio: '16:9',
            showControls: true,
            showCover: {
              beforeLoad: true,
              onPaused: false,
              onSeek: false
            }
          },
          imageOptions: {
            low: {
              size: 40,
              quality: 'poor'
            },
            high: {
              size: 1200,
              quality: 'good'
            },
            title: null,
            effects: {
              blur: 0,
              gradient: {
                active: true
              }
            }
          }
        }
      }
    }
  },
  components: {
    DynamicImage,
    // VideoPlayer
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    is(type) {
      if (!this.$props.file.type) return false;
      if (this.$props.file.type.indexOf(type) !== -1) return true;
      return false;
    }
  }
}
</script>

<style lang="sass">


</style>
