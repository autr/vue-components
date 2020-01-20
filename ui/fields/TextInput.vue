<template lang="pug">
	.textinput
		input(
			v-validate="field.rules"
		    data-vv-delay="500"
			v-model="field.value"
			:id="field.fieldId"
			:name="field.name"
			:disabled="disabled"
			:placeholder="field.placeholder"
			type="text" 
		)
		//- .error( v-if="errors.has('email')" ) {{errors}}

</template>
<script>

import Base from './Base.vue'

export default {
	name: 'TextInput',
	inject: ['$validator'],
	extends: Base,
  	props: { ...Base.props },
	mounted() {
	},
    methods: {
    }
}
</script>
<style lang="sass" scoped>
</style>