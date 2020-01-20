<template lang="pug">
	.checkbox-wrapper(:for="fieldId")
		input(
			v-validate="field.rules"
			v-model="field.value"
			:name="field.label"
			:id="fieldId"
			type="checkbox"
			:disabled="disabled"
			:data-vv-group="groupId"
		)
		.checkbox
		label.checkbox__label(
			:for="fieldId"
			:class="{active: field.value}"
		) {{field.label}}

</template>
<script>

import Base from './Base.vue'

export default {
	name: 'CheckBox',
	extends: Base,
  	props: { ...Base.props },
	mounted() {
	},
	methods: {
	},
	computed: {
		fieldId() {
			let l = this.$props.field.label;
			return l.toLowerCase().replace(/ /g, "-") + 'Id';
		},
		groupId() {
			let l = this.$props.field.label;
			return l.toLowerCase().replace(/ /g, "-") + 'GroupId';
		}
	}
}
</script>

<style lang="scss" scoped>

.checkbox-wrapper {
	position: relative;
	cursor: pointer;
}

input[type="checkbox"] {
	outline: none;
	margin-right: 12px;
	cursor: pointer;
}
.checkbox {
	position: absolute;
	top: 2px;
	left: 0;
	z-index: 100;
	width: 18px;
	height: 18px;
	border: 1px solid black;
	background: white;
	pointer-events: none;
	cursor: pointer;
	border-radius: 3px;

	transition: 100ms;
	input[type="checkbox"]:checked + & {
		background: red;
		border-color: transparent;
		background-image: url('/static/icons/checkbox-tick.svg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 80%;
		cursor: pointer;
	}
}

</style>