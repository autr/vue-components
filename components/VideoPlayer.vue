<template lang="pug">
.video-player(v-bind:class="classes")
	dynamic-image( ref="image" :file="cover" :options="opts.imageOptions" v-if="cover")
	.video( ref="wrapper"   v-if="file" :style="{paddingTop: paddingTop}" )
		.vimeo( v-if="isVimeo" )
			vue-vimeo-player( ref="player" v-bind="internalVimeoOptions" @ready="onReady" @play="onPlay" @pause="onPause" @seeked="onSeek" @error="onError")
			//- update(videoID): Recreates the Vimeo player with the provided ID
			//- play()
			//- pause()
			//- mute()
			//- unmute()
		.native( v-if="isNative" )
			video( ref="player"  :controls="opts.showControls" :loop="opts.loop" :autoplay="opts.autoplay" @canplay="onReady" @playing="onPlay" @pause="onPause")
				source( :src="file.data.full_url" )
	//- //- .controls
	//- 	button( v-on:click="playPause" )
	//- 	p Status {{status}}
</template>

<script>
// import Media from '@dongido/vue-viaudio'
import {vueVimeoPlayer} from 'vue-vimeo-player'
import Base from './Base.vue'
import DynamicImage from './DynamicImage.vue'

// import VueVideo from './file.vue'

export default {
	name: 'VideoPlayer',
	extends: Base,
	components: {
		vueVimeoPlayer,
		DynamicImage
	},
	computed: {
		isVimeo() {
			return (this.$props.file.type === "embed/vimeo");
		},
		isNative() {
			return (!this.isVimeo && this.$props.file.data);
		},
		paddingTop() {

				const ratio = this.opts.sizeRatio.split(':');
				return ((ratio[1]/ratio[0]) * 100) + '%';

		},
		isLocal() {
			return false
		}, 
		opts() {

			/*-- combine defaultOptions with $props options into "opts" --*/

			let opts = {};
			Object.assign(opts, this.defaultOptions, this.$props.options)
			return opts;
		},
		apiCover() {

			// this.options.poster = `${window.project.site.urls.thumbnails}/${size}/${size}/crop/good/${file}`;
			return "";
		},
		classes() {
			return {
				'status-loading': (this.status == -1),
				'status-ready': (this.status == 0),
				'status-playing': (this.status == 1),
				'status-paused': (this.status == 2),
				'status-seeking': (this.status == 3),
				'status-error': (this.status == 4)
			}
		},
		internalVimeoOptions() {
			return {
				'video-id': this.$props.file.embed,
				'loop': this.opts.loop,
				'player-width': this.opts.width,
				'player-height': this.opts.height,
				'autoplay': this.opts.autoplay,
				'volume': this.opts.volume,
				'options': {
					volume: this.opts.volume,
					color: this.opts.vimeoColor
				}
			}
		}
	},
	mounted() {

		this.containInParent( this.$refs.image );
	},
	destroyed() {
	  // document.removeEventListener("resize", this.setVideoRatio);
	},
	methods: {
		playPause() {
			if (!this.$refs.player) return;
			if (this.status === 1 ) {
				this.$refs.player.pause();
			} else {
				this.$refs.player.play();
			}
		},
		play() {
			if (!this.$refs.player) return;
			this.$refs.player.play();
		},
		pause() {
			if (!this.$refs.player) return;
			this.$refs.player.pause();
		},
		volume(vol) {
			if (!this.$refs.player) return;
			if (this.isVimeo) this.$refs.player.unmute(vol);
			if (this.isNative) this.$refs.player.volume = vol;
		},
		mute() {
			if (!this.$refs.player) return;
			if (this.isVimeo) this.$refs.player.mute();
			if (this.isNative) this.$refs.player.volume = 0;
		},
		unmute() {
			if (!this.$refs.player) return;
			if (this.isVimeo) this.$refs.player.unmute();
			if (this.isNative) this.$refs.player.volume = this.opts.volume;
		},

		onReady() {

			this.status = 0;
			this.$emit('statusChanged', this.status);
			this.volume( this.opts.volume );

			// console.log('onReady');

		},
		onPlay() {
			this.status = 1;
			this.$emit('statusChanged', this.status);
			if (!this.$refs.player) return;
			this.volume( this.opts.volume );
		},
		onPause() {

			this.status = 2;
			this.$emit('statusChanged', this.status);
			// console.log('onPause');
		},
		onSeek() {

			this.status = 3;
			this.$emit('statusChanged', this.status);
			// console.log('onSeek');
		},
		onError() {

			this.status = 4;
			this.$emit('statusChanged', this.status);
			// console.log('onError');
		},
		setVideoRatio(e) {


		}
	},
	data() {
        return {
        	defaultOptions: {
        		autoplay: false,
        		volume: 0,
        		loop: true,
        		posterSizeLimit: 1200,
        		vimeoColor: 'FFFFFF',
        		sizeRatio: '16:9',
        		showControls: false,
        		showCover: {
        			beforeLoad: true,
        			onPaused: false,
        			onSeek: false
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
        	},
        	status: -1,
        }
	},
	props: {
		file: {
			type: Object,
			required: true
		},
		cover: {
			type: Object,
			required: true
		},
		options: {
			type: Object,
			required: false
		}
	}
}
</script>

<style lang="sass">

@import '../base'
.video-player
	width: 100%
	overflow: hidden
	position: relative
	.image-wrapper
		transition: opacity 1s ease
		transition-delay: 0s
		opacity: 1
	&.status-playing
		.image-wrapper
			opacity: 0
			// transition-delay: 1s
	.video
		background: black
		position: relative
	.vimeo, .native, #vimeo-player-1, iframe, .image-wrapper
		@include fill()
		z-index: 1
	.image-wrapper
		z-index: 5
		height: 0
	.native
		video
			outline: none
			width: 100%

</style>