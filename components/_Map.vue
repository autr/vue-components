<template lang="pug">
  .map-wrapper
    img( style="display:none" src="~/assets/marker.svg" ref="marker" )
    GMap(
    v-if="ready"
    ref="gMap"
    :locations="gps"
    :center="gps"
    :options="options"
    :zoom="zoom")
      GMapMarker(
        :position="gps"
        :options="options.icon"
         )
</template>

<script>

import Base from './Base.vue'
export default {

  name: 'Map',
  extends: Base,
  computed: {
    parsedStyle() {
      return JSON.parse( this.$props.styles );
    },
    options() {
      return { 
        disableDefaultUI: true, 
        icon: {
          icon: this.$refs.marker.src
        }, 
        fullscreenControl: false, 
        styles: this.parsedStyle
      }
    }
  },
  components: {
  },
  props: {
    zoom: {
      type: Number,
      required: false,
      default: 12
    },
    gps: {
      type: Object,
      required: true
    },
    styles: {
      type: String,
      required: false,
      default: '[{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#4c42fb"}]},{"featureType": "landscape","elementType": "all","stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"},{"lightness": "-77"}]},{"featureType": "road","elementType": "all","stylers": [{"saturation": -100},{"lightness": 45}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"visibility": "on"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "labels","stylers": [{"gamma": "0.00"}]},{"featureType": "road","elementType": "labels.text","stylers": [{"gamma": "0.00"},{"saturation": "-58"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"gamma": "0.00"},{"color": "#4c42fb"},{"lightness": "31"},{"visibility": "on"}]},{"featureType": "road","elementType": "labels.text.stroke","stylers": [{"color": "#ffffff"}]},{"featureType": "road","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#ffffff"},{"visibility": "off"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#ffffff"},{"visibility": "on"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"visibility": "off"},{"lightness": "-85"}]},{"featureType": "road.highway","elementType": "labels.text.stroke","stylers": [{"color": "#ff0000"}]},{"featureType": "road.highway","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "road.highway.controlled_access","elementType": "labels.text.fill","stylers": [{"lightness": "100"},{"visibility": "off"}]},{"featureType": "road.highway.controlled_access","elementType": "labels.text.stroke","stylers": [{"color": "#ff0000"}]},{"featureType": "road.highway.controlled_access","elementType": "labels.icon","stylers": [{"lightness": "53"},{"visibility": "off"},{"color": "#4c42fb"}]},{"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "labels.text.stroke","stylers": [{"color": "#ff0000"},{"visibility": "off"}]},{"featureType": "road.arterial","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "road.local","elementType": "labels.text.stroke","stylers": [{"color": "#ff0000"},{"visibility": "off"}]},{"featureType": "transit","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "geometry.fill","stylers": [{"visibility": "off"},{"lightness": "-59"}]},{"featureType": "transit","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "labels.text.fill","stylers": [{"lightness": "63"}]},{"featureType": "transit","elementType": "labels.text.stroke","stylers": [{"lightness": "27"}]},{"featureType": "transit.station","elementType": "geometry.stroke","stylers": [{"lightness": "-59"}]},{"featureType": "water","elementType": "all","stylers": [{"color": "#c5d4df"},{"visibility": "on"},{"lightness": "-25"},{"saturation": "5"},{"gamma": "4.56"}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"color": "#4c42fb"}]}]'
    }
  },
  data() {
    return {
      ready: false
    }
  },
  beforeDestroy() {
  },
  mounted() {

    this.$nextTick( () => {
      this.ready = true;
    });
  },
  methods: {
  }
}
</script>

<style lang="sass">
@import '../_utils'
.map-wrapper
  overflow: hidden
</style>
