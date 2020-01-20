<template lang="pug">
	.color-picker
		chrome-picker(
			v-model="colors", 
			@change-color="onChange"
		)

</template>


<script>

import { Material, Compact, Swatches, Slider, Sketch, Chrome, Photoshop } from 'vue-color'

var defaultProps = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.30,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
};

export default {
	name: 'color-picker',
	components: {
	    'material-picker': Material,
	    'compact-picker': Compact,
	    'swatches-picker': Swatches,
	    'slider-picker': Slider,
	    'sketch-picker': Sketch,
	    'chrome-picker': Chrome,
	    'photoshop-picker': Photoshop
	},
	data () {
		return {
			colors: defaultProps
		}
	},
	props: ['name', 'color'],
	methods: {
	}
}



</script>


<style lang="scss">


</style>