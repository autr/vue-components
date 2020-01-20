<template lang="pug">
	.textarea
		textarea(
			v-validate="field.rules"
			v-model="field.value"
			v-bind:id="field.fieldId"
			v-bind:name="field.name"
			v-bind:rows=" (field.rules) ? field.rules.rows : 8"
			v-bind:disabled="disabled"
			v-bind:placeholder="field.placeholder"
		)

</template>
<script>

import Base from './Base.vue'

export default {
	name: 'TextArea',
	inject: ['$validator'],
	extends: Base,
  	props: { ...Base.props },
	mounted: function(){
		// this.$nextTick(function(){
		// 	bus.$emit('field-added', this);
		// });
	},
    methods: {
      validateGroup(group) {
      	// bus.$emit('field-blurred', group);
      }
    }
}
</script>
<style lang="scss" scoped>
textarea {
	resize: none;
	min-height: 120px;
}
</style>