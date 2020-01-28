<template lang="pug">
span.image-wrapper( v-bind:class="classes" :style="{paddingTop: paddingTop}"  itemscope itemtype="http://schema.org/ImageObject" )
	svg.background( viewBox="0 0 10 10" preserveAspectRatio="none")
		path(d='M 0 0 L 10 10 ' vector-effect="non-scaling-stroke" )
		path(d='M 10 0 L 0 10 ' vector-effect="non-scaling-stroke" )

	span.inner( v-if="$slots.default" ): slot
	span.image.low( v-show=" file && status >= 0" )
		img( ref="low" :title="parsedTitle" :alt="title"  @load="onLoadLow()" :src="lowUrl" v-bind:style="{filter: blur}" importance="high" )
	span.image.high( v-show="file && status > 0" )
		img( itemprop="contentUrl" ref="high" :title="parsedTitle" :alt="parsedTitle" @load="onLoadHigh()" :src="highUrl" importance="low" )
	span.invisible(itemprop="name") {{parsedTitle}}
	span.invisible(itemprop="description") {{parsedDescription}}
	meta(itemprop="datePublished" :content="$moment( file.uploaded_on ).format('YYYY-MM-DD')")
</template>

<script>
	
export default {
	name: 'DynamicImage',
	watch: {
	},
	computed: {
		classes() {
			let classes = {};
			let states = ['loading', 'preview', 'full'];
			// classes[this.opts.mode] = true;
			classes[ `state-${states[this.status]}` ] = true;
			return classes
		},
		rotate() {
			return `rotate(  ${  (  ( this.file.height / this.file.width ) * 45 ) }deg`;
		},
		opts() {

			/*-- combine defaultOptions with $props options into "opts" --*/

			let opts = {};
			Object.assign(opts, this.defaultOptions, this.$props.options)
			return opts;
		},
		paddingTop() {

			if (!this.file) return '100%';
			
			return `${ ( this.file.height / this.file.width ) * 100 }%`
		},
		blur() {
			return `blur( ${this.opts.blur}px )`;
		},
		parsedDescription() {
			return this.file.description || this.$props.description;
		},
		parsedTitle() {
			return `${this.file.title} ${this.$props.title}`;
		},
		lowUrl() {
			return `${this.$store.state.site.thumbnails}/${this.$props.lowSize}/${this.$props.lowSize}/contain/${this.$props.lowQuality}/${this.file.filename}`;
		},
		highUrl() {
			return `${this.$store.state.site.thumbnails}/${this.$props.highSize}/${this.$props.highSize}/contain/${this.$props.highQuality}/${this.file.filename}`;
		}
	},
	data() {
		return {
			test: 0,
			status: -1,
			defaultOptions: {
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
	},
	methods: {
		onLoadLow() {
			const t = this;

			setTimeout( () => {
				t.$emit('loadedLow')
				t.status = 1;
			}, this.test)
		},
		onLoadHigh() {
			const t = this;
			setTimeout( () => {
				t.$emit('loadedHigh')
				t.status = 2;
			}, this.test)

		}
	},
	mounted() {

			const t = this;

			setTimeout( () => {
				t.status = 0;
			}, this.test)

			// console.log('IMAGE!!!', this.$props);
	},
	props: {

		file: {
			type: Object,
			required: true
		},
		options: {
			type: Object,
			required: false
		},
		title: {
			type: String,
			required: false,
			default: ""
		},
		description: {
			type: String,
			required: false,
			default: ""
		},
		lowSize: {
			type: Number,
			required: false,
			default: 40
		},
		highSize: {
			type: Number,
			required: false,
			default: 1200
		},
		lowQuality: {
			type: String,
			required: false,
			default: 'poor'
		},
		highQuality: {
			type: String,
			required: false,
			default: 'good'
		}
	}
};
</script>

<style scoped lang="sass">
@import '../_utils'

.image-wrapper
	display: block
	position: relative
	height: 0px
	// *
	// 	padding: 0
	// 	margin: 0
	.inner, .high, .low, .background
		@include fill()

	.background
		z-index: 1
		width: 100%
		// height: 100%
		path
			stroke: black
			stroke-width: 1px
	.low
		z-index: 2
	.high
		z-index: 3
	.inner
		z-index: 4
	img 
		width: 100%
		height: 100%
		display: block

	.background
		border: 1px solid black
		box-sizing: border-box
	.low
		img
			image-rendering: pixelated
	.high
		opacity: 0
		transition: opacity 1s ease
	&.state-full
		.high
			opacity: 1


</style>
