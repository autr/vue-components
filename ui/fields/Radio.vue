<template lang="pug">
.radio-wrapper
	.option(v-for="opt, i in field.options")
		input(
			v-validate="field.rules"
			v-model="field.value"
			v-bind:name="field.name"
			:value="opt"
			:id="optId(i)"
			type="radio"
			v-on:change="onChange"
			v-on:click="onClick"
			:disabled="disabled"
		)
		label(
			:for="optId(i)"
			:class="{active: field.value === optId(i) }"
		) {{opt}}

</template>
<script>
import Base from './Base.vue'

export default {
	name: 'Radio',
	extends: Base,
	methods: {
		onChange() {
			this.$emit('onChange');
		},
		onClick() {
			this.$emit('onClick');
		}
	}
}
</script>

<style lang="sass" scoped>

.radio-wrapper 
	position: relative
	.option
		display: inline-block

</style>