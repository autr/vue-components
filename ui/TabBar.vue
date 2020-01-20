<template lang="pug">
	.tab-bar(
		ref="tab"
	)
		.tab-bar__inner(
			v-if="items"
		)
			.tab__outer( 
				v-on:created="scrollOverflow($el)"
				v-on:click.prevent="scrollOverflow($el)" 
				v-bind:style="{width: `${tabsbarWidth}px`}"
			)
				router-link(
					v-bind:ref="`${item.id}`"
					class="tab"
					v-for="item, i in items"
					v-bind:style="{width: `${tabWidth}px`}"
					v-bind:class= "{active: (item.url.slug == currentSelected), expiring: item.expiring}"
					v-bind:key="i"
					v-bind:to="item.url.slug"
				)
					.transaction-icon
						.icon
							hexagon.hexagon--light.hexagon--locked(
								v-if="(!item.written_to_blockchain_on)&&(currentStep !== i)&&(!item.assets)"
								v-bind:size="20"
								style="margin-right: 4px"
							)
							tick(
								v-if="item.written_to_blockchain_on"
								v-bind:number="''"
								v-bind:size="16"
								v-bind:status="0"
								style="margin: 4px 0px" 
							)
							hexagon.hexagon--light(
								v-if="currentStep == i"
								v-bind:number="''"
								v-bind:size="20"
								v-bind:status="0"
							)
					.tasks-icon(v-if="item.assets")
						.icon(v-if="item.assets.length")
							hexagon.hexagon--dark(
								v-bind:number="item.assets.length"
								v-bind:size="28"
								v-bind:status="0"
							)
						.icon(v-if="!item.assets.length")
							tick(
								v-bind:size="16"
							)

					.tab__text 
						dot.dot--alert(
							v-if="(item.expiring) && (item.written_to_blockchain_on === null)"
							v-bind:size="8"
							style="margin-right: 4px"
						)
						span.text {{item.title}}

</template>

<script>

import Velocity from 'velocity-animate'
import Icon from './../widgets/Icon.vue'
import Counter from './../widgets/Counter.vue'
import Hexagon from './../widgets/Hexagon.vue'
import Dot from './../widgets/Dot.vue'
import Tick from './../widgets/Tick.vue'

export default {
	name: 'tab-bar',
	mounted() {
		this.setTabSizes();
	},
	components: {Icon, Counter, Hexagon, Dot, Tick},
	computed: {
	},
	ready: function () {
	  window.addEventListener('resize', this.setTabSizes)
	},
	beforeDestroy: function () {
	  window.removeEventListener('resize', this.setTabSizes)
	},
	data () {
		return {
			tabsbarWidth: 0,
			tabWidth: 0,
			tabCornerWidth: 0,
		}
	},
	props: ['currentStep', 'items', 'routerLink', 'currentSelected'],
	methods: {
		getIconType(item) {
			if (item.status === 0) return 'current';
			if (item.status === 0) return ;
		},
		setTabSizes() {
			this.scrollOverflow(this.$el);
			var tabsbarWidth = this.$el.offsetWidth;
			var division = (this.items.length - 1);
			if (division === 1) division = 2;
			if (division === 0) division = 1;
			var width = tabsbarWidth / division;
			this.tabCornerWidth = width/2;
			this.tabWidth = width; 
			if (this.tabWidth < 192) this.tabWidth = 196;
			this.tabsbarWidth = this.$props.items.length * this.tabWidth;
		},
		fitText(text) {
			var max = 26;
			if (text.length > max) text = text.substring(0, max) + ' ...';
			return text;
		},
		scrollOverflow(elem) {
			var active = elem.querySelector('.active');
			var length = elem.querySelectorAll('.tab').length;
			var i = 0;

			while( (active = active.previousSibling) != null ) i++;
			var outerWidth = elem.offsetWidth;
			var innerWidth = elem.querySelector('.tab__outer').offsetWidth;
			var scrollLeft = elem.scrollLeft;
			var iteration = i * (outerWidth / (length - 1));
			var active = elem.querySelector('.active');
			var offset = (active.previousSibling) ? (-active.previousSibling.offsetWidth) : 0;


			// console.log(offset, innerWidth - scrollLeft - outerWidth);

			Velocity(active, 'scroll', { axis: 'x', container: elem, duration: 400, offset: offset, easing: 'easeInOutQuad'});
		}
	}
}
</script>

<style lang="scss" scoped>




@keyframes bob {
	0% {
		transform: translateY(0%)
	}
	50% {
		transform: translateY(-8%)
	}
	100% {
		transform: translateY(0%)
	}
}
@keyframes pulse {
	0% {
		transform: scale(1)
	}
	50% {
		transform: scale(1.05)
	}
	100% {
		transform: scale(1)
	}
}

.active {
	.icon {
		animation-name: bob;
    	animation-duration: 0.4s;
    	animation-timing-function: ease;
    	// animation-duration: 1s;
    	.hexagon {

				// transform: scale(1)!important;
    	}
	}
}

.tab-bar--tasks {
	background: $c-b90;
	.tab {
		color: $c-b40;
		border-bottom: 4px solid transparent;
		padding: 24px 6px 18px 6px;
		&::before, &::after {
			top: 38px;
		}
		&::before, &::after {
			border-top: 1px dashed $c-b60;
		}
		&:hover {
			background: $c-b88;
			border-bottom-color: $c-b70;
		}
		&.active {
			border-bottom-color: $c-b40;
			background: $c-b85;
			color: $c-white;
		}

	}
}




.tab-bar--transactions {
	background: $c-b15;
	.tab {
		color: black;
		border-bottom: 4px solid $c-b20;
		padding: 24px 24px 12px 24px;
		&::before, &::after {
			border-top: 1px dashed $c-b30;
		}
		&:hover {
			background: $c-b10;
			border-color: $c-b25;
		}

		&.active {
			background: $c-b20;
			border-color: $c-b50;
		}

	}
}

.tab-bar {
	position: relative;

	overflow-x: scroll;
	overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
}

	.tab-bar__inner {
		white-space: nowrap;
		width: fit-content;
		table-layout: fixed;
		display: table;
	}



.tab {
	position: relative;
	display: inline-block;
	display: table-cell;
	text-decoration: none;
	transition: 300ms;
	text-align:center;
	width: 192px;
		vertical-align:top;

	&:first-child::before {
		display: none;
	}
	&:last-child::after {
		display: none;
	}

	&::before, &::after {
		display: block;
		content: "";
		width: 42%;
		height: 1px;
		position: absolute;
		top: 2.2em;
	}

	&::before {
		left: 0%;
	}
	&::after {
		right: 0%;
	}

	.tasks-icon {
		position: relative;
		display: inline-block;
		height: 40px;
		.dot {
			position: absolute;
			z-index: 20;
			right: -10px;
			top: -4px;
		}
	}

	.tab__text {
		vertical-align: bottom;
		white-space: normal;
		margin: 0;
		font-weight: 300;
		font-size: 14px;
		font-weight: 400;
		word-wrap: normal;
		.text {
			transform: scale(0.9);
			transition: transform 0.2s ease;
		}
	}
	&.active {
			.tab__text .text {
				transform: scale(1);
			}
	}
}



.tab-bar--tasks--lighten {
	background: transparent;
	.tab {
		color: $c-b60;
		border-bottom: 4px solid transparent;
		padding: 16px 8px 24px 8px;
		font-weight: 800;
		&::before, &::after {
			top: 36px;
		}
		&::before, &::after {
			border-top: 1px dashed $c-b60;
		}
		&.active {
			color: $c-black;
		}

	}
}




</style>