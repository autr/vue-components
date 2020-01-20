<template lang="pug">

	.select-wrapper
		svg(xmlns='http://www.w3.org/2000/svg' viewBox='-5 -5 15 15' )
			path.arrow(d='M 0 5 L 5 10 L 10 5' )
		select(
			v-validate="field.rules"
			v-bind:data-vv-group="field.groupId"
			v-model="field.value"
			v-bind:rows="field.rows"
			v-bind:id="field.fieldId"
			v-bind:placeholder="field.placeholder"
			v-bind:disabled="disabled"
		).select-input
			option(
				v-for="option, i in field.options"
				v-bind:id="i"
				v-bind:value="option"
			) {{option}}
		.textinput: input(
			type="text"
			v-model="field.value"
			v-bind:name="field.name"
			v-bind:placeholder="field.placeholder" 
			v-bind:disabled="disabled"
			tab-index="-1"
			
		).select-box
		//- errors(v-bind:errors="errors")

</template>
<script>

// import Errors from './../Errors.vue'

export default {

	mounted() {
		// this.arrow = 
	},
	data() {
		return {
			val: null,
			height: 20,
			path: 'M 0 0'
		}
	},
	computed: {
		arrowPath() {
			return `M ${this.height * 0.3} ${this.height * 0.4} L ${this.height * 0.5} ${this.height * 0.6} L ${this.height * 0.7} ${this.height * 0.4}`;
		}
	},
    methods: {
    },
	components: {
		// Errors
	},
	props: ['field', 'disabled'],
	name: 'select-input'
}
</script>
<style lang="sass" scoped>

@import '../../_utils'

.select-wrapper
	position: relative
	svg
		width: 1em
		position: absolute
		top: 0.5em
		right: 1em
		path
			stroke: black
			stroke-width: 1px
			fill: none
	select
		opacity: 0
		@include fill()

</style>