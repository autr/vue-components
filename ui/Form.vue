////////////////////////////////////////////////////////
////// Validation *rules* handled by vee-validate: /////
////// http://vee-validate.logaretm.com/rules.html /////
////////////////////////////////////////////////////////

<template lang="pug">
	form( autocomplete="on"  v-on:submit.prevent="validateBeforeSubmit" ).form
		.form-group(
			v-for="group, i in form"
			v-bind:key="i"
			v-bind:id="group.groupId"
			v-bind:class="{'disabled': disabled}"
		)
				.grid__item.desk--one-half(
					v-for="field, ii in group.fields"
					v-bind:key="ii"
				)
					field(
						v-bind:field="field"
						v-bind:disabled="disabled"
					)
</template>

<script>
import Field from './Field.vue'

export default {
	created() {
	},
	name: 'FieldGroup',
	components: {
		Field
	},
	computed: {

	},

	data () {
		return {
		}
	},
	methods: {
	}
}
</script>

<style lang="sass">



</style>

