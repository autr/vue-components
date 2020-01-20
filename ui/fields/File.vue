<template lang="pug">

	.file-input
		.grid
			.grid__item.one-half
				.file__wrapper(v-if="!disabled")
					input(
						v-validate="field.rules"
						v-bind:data-vv-group="field.groupId"
						v-on:change="validateGroup(field.group)"
						type='file'
						v-bind:id="field.fieldId"
						v-bind:name="field.label"
						v-bind:disabled="disabled"
					)
					button.file__upload(v-on:click.prevent="") 
						span(v-if="field.value") Replace  
						span(v-if="!field.value") Upload  
						span {{field.type | capitalize}}
				p(
					v-bind:class="{disabled: disabled}"
					v-if="((field.type === 'image')&&(field.value)&&(!disabled))"
				) {{field.value.split(/(\\|\/)/g).pop()}}
				p(
					v-if="disabled && field.value"
				)
					a.link(v-bind:href="field.value") {{field.value}}
			.grid__item.one-half(v-if="!disabled")
				p(
					v-bind:class="{disabled: disabled}"
					v-if="(field.type === 'file')&&(field.value)"
				) {{field.value.split(/(\\|\/)/g).pop()}}
				img(
					v-if="field.type === 'image'"
					v-bind:src="field.value"
				)
				errors(v-bind:errors="errors")

</template>
<script>

import Errors from './../Errors.vue'
import LabelInput from './Label.vue'

export default {
	mounted: function(){
		var self = this;
		this.$nextTick(function(){
			bus.$emit('field-added', this);
		});
		var input = this.$el.querySelectorAll('input')[0];
		if (input) input.addEventListener('change', this.fileChanged);
	},
    methods: {
      validateGroup(group) {
      	bus.$emit('field-blurred', group);
      },
      fileChanged(event) {


      	/////// SIMULATION

      	this.$props.field.value = event.target.value;
      	this.$props.field.value = '/static/images/diamond-ir.jpg';
      }
    },
	components: {Errors},
	name: 'file-input',
	props: ['field', 'disabled']
}
</script>
<style lang="scss">

.file__wrapper {
	display: inline-block;
	position: relative;
	input {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
}

</style>