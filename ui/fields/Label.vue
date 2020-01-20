<template lang="pug">
	label(
		v-bind:for="field.fieldId"
	)
		span {{field.label}}
		//- span( v-if="!field.rules.required" ) (optional)
</template>

<script>
export default {
	mounted: function(){},
	name: 'checkbox-input',
	props: ['field', 'disabled']
}
</script>

<style lang="sass" scoped>
</style>