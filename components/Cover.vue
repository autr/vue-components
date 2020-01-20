<template lang="pug">
	.cover( ref="cover" v-bind:class="{'show-pixels': autoPixels && (status === 0) }")
		.cover-inner
			video-player( ref="video" :cover="cover" :file="file" :options="options" v-on:statusChanged="onStatusChanged" )
			dynamic-image( v-if="!file" ref="video" :file="cover" )
</template>

<script>
import Base from './Base.vue'
import VideoPlayer from './VideoPlayer.vue'
import DynamicImage from './DynamicImage.vue'
export default {
  name: 'Cover',
  extends: Base,
	props: {
		cover: {
			type: Object,
			required: false
		},
		file: {
			type: Object,
			required: false
		},
		options: {
			type: Object,
			required: false,
			default: {
				
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
			}
		},
		autoFade: {
			type: Number,
			default: 0,
			required: false
		},
		autoPixels: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	components: {
		DynamicImage,
		VideoPlayer
	},
	data() {
		return {

		}
	},
	mounted() {

	this.$nextTick(() => {
		this.containInParent( this.$refs.video );

	});



	},
	methods: {

		playFade() {

			const hasRef = this.$refs.video;

			// console.log('Playfade', this.$props.autoFade);
			if (!hasRef) return;
			let vol = {
				v: 0,
				def: 0.8
			};
			if (this.videoAnim) {
				this.videoAnim.kill();
			}
			this.$refs.video.play();
			this.videoAnim = TweenMax.to(vol, 1, {
				v: vol.def,
				ease: Ease.easeOut,
				onComplete: () => {
					this.videoAnim = null;
				},
				onUpdate: () => {
					// console.log(this.$refs.video);
					if (this.$refs.video) this.$refs.video.volume(vol.v);
				}
			})
		},
		pauseFade() {

			const hasRef = this.$refs.video;

			// console.log('PauseFade', this.$props.autoFade);
			if (!hasRef) return;
			let vol = {
				v: 0.8,
				def: 0.8
			};
			vol.v = vol.def;
			if (this.videoAnim) {
				this.videoAnim.kill();
			}
			this.videoAnim = TweenMax.to(vol, 1, {
				v: 0,
				ease: Ease.easeOut,
				onComplete: () => {
					// console.log('kill!');
					if (this.$refs.video) this.$refs.video.pause();
					this.videoAnim = null;
				},
				onUpdate: () => {
					// console.log('update!');
					if (this.$refs.video) this.$refs.video.volume(vol.v);
				}
			})
		},
		bindAutoFade() {

			

			this.$scrollmagic.addScene(
				this.$scrollmagic.scene({
					// triggerElement: '.cover',
					triggerHook: 0,
					offset: window.innerHeight * this.$props.autoFade,
					reverse: true
				}).on("leave", (e) => {
					this.playFade();
				}).on("enter", (e) => {
					if (this.status == 1) this.pauseFade();
				})
			);



		},
		coverLoaded() {
		},
		onStatusChanged(status) {
			this.status = status;

			if (this.$props.autoFade > 0 && status === 0) {
				this.bindAutoFade();
			}
			const morethan = window.scrollY > (window.innerHeight * this.$props.autoFade );
			if (status === 1 && morethan) this.pause();
			this.$emit('statusChanged', status);

		},
		play() {

			// console.log('play');
			if (this.$refs.video) this.$refs.video.play();
		},
		pause() {
			// console.log('pause');
			if (this.$refs.video) this.$refs.video.pause();
		},
		volume(vol) {
			// console.log('volume', vol);
			if (this.$refs.video) this.$refs.video.volume(vol);
		},
	}
}
</script>

<style lang="sass">

@import '../base.sass'
.cover.show-pixels
	.image
		.hires 
			opacity: 0
		.lores
			filter: grayscale(100%)
.cover
	display: block
	background: black
	justify-content: center
	overflow: hidden
	position: relative
	z-index: 0
	height: 100vh
	width: 100%
	.cover-inner
		@include fill()
		position: fixed
</style>
