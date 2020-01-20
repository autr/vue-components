////////////////////////////////////////////////////////
////// Validation *rules* handled by vee-validate: /////
////// http://vee-validate.logaretm.com/rules.html /////
////////////////////////////////////////////////////////

<template lang="pug">
	form(autocomplete="on"  v-on:submit.prevent="validateBeforeSubmit" ).form
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
		var t = this;

		// Add group validation to vee-validate fields 

		bus.$on('field-added', this.validateGroups);
		bus.$on('validate-form', () => {
			console.log('validate-form received');
			bus.$emit('validating-form', this.validateForm());
		});

		this.createIds();

	},
	name: 'form-auto',
	components: {
		Field
	},
	computed: {

	},

	data () {
		return {
			components: []
		}
	},
	props: ['form', 'disabled'],
	methods: {
		setStatus(groupId, status) {

			// Find index of this group

			var group = this.$el.querySelector(`#${group}`);
			this.$props.form.forEach((group) => {

				if (group.groupId === groupId) {

					group.status = status;
					group.title += ' ';
				}
			});

		},
		validateGroups(component) {

			this.components.push(component);

			// Find actual input element inside component:

			var t = this;
			var input = component.$el.querySelectorAll('[data-vv-group]')[0];
			if (!input) return;
			var group = input.getAttribute('data-vv-group');

			// Add 'change' event listener

			input.addEventListener('change', (e)=>{


				// Give a little delay for debounce

				setTimeout(() => {

					var selector = (`[data-vv-group='${group}']`);
					var siblings = document.querySelectorAll(selector);

					// Check to see if 'filled' and 'validated' assumptions are true...

					var filled = true;
					var validated = true;

					// Check is siblings are 'valid' or 'filled' ...

					siblings.forEach((el) => {
						if (el.getAttribute('aria-invalid') === 'true') validated = false;
						if ((el.getAttribute('aria-required'))&&(el.value === '')) filled = false;
					});

					// Set group element status:

					if (filled) {
						if (validated) {
							t.setStatus(group, 1);
						} else {
							t.setStatus(group, -1);
						}
					} else {
						t.setStatus(group, 0);
					}
				}, 500);
			});
		},
		validateGroupFields() {

		},
		validateForm() {

			var t = this;
			return new Promise(function (fulfill, reject){
				var valid = 0;
				t.components.forEach((component)=> { 
					component.$validator.validateAll().then((success) => {
						valid += 1;
						if (valid === t.components.length) {
							fulfill(true);
						}
					}).catch((error) => {
						reject(false);
					});
				});
			});
		},
		createIds() {
			this.$props.form.forEach((group, i) => {
				if (!group.title) group.title = '';
				group.groupId = sanitise(group.title + i);
				group.fields.forEach((field, ii) => {
					field.groupId = group.groupId;
					field.fieldId = sanitise(group.title + i + field.label + ii);
				});
			});
		}
	}
}
</script>

<style lang="scss">



</style>

