////////////////////////////////////////////////////////
////// Validation *rules* handled by vee-validate: /////
////// http://vee-validate.logaretm.com/rules.html /////
////////////////////////////////////////////////////////

<template lang="pug">
	.field(
		v-if="data"
		:class="{disabled: disabled}"
	)
		.field-inner
			text-input(
				:field="data"
				:disabled="disabled"
				v-if="coreFieldType === 'text'"
			)
			text-input(
				:field="data"
				:disabled="disabled"
				v-if="coreFieldType === 'input'"
			)
			text-area(
				:field="data"
				:disabled="disabled"
				v-if="coreFieldType === 'textarea'"
			)
			checkbox-input(
				:field="data"
				:disabled="disabled"
				v-if="coreFieldType === 'checkbox'"
			)
			file-input(
				:field="data"
				:disabled="disabled"
				v-if="coreFieldType === 'file'"
			)
			select-input(
				:field="data"
				:disabled="disabled"
				v-if="coreFieldType === 'select'"
			)
		//- .errors(v-if=" errors.has(data.name) ") {{errors.first(data.name)}}


</template>


<script>

import TextInput from './fields/TextInput.vue'
import SelectInput from './fields/Select.vue'
import FileInput from './fields/File.vue'
import CheckboxInput from './fields/Checkbox.vue'
import TextArea from './fields/TextArea.vue'
import LabelInput from './fields/Label.vue'



export default {
	inject: ['$validator'],
	created() {
	},
    computed: {
    	coreFieldType() {

    		// Add country options to countries field

    		if (this.$props.data.type === 'countries') {
    			this.$props.data.options = countries;
    		}

    		// Return the correct component for different data types

    		switch (this.$props.data.type) {

    			// Files

				case 'file': return 'file';
				case 'image': return 'file';
				case 'document': return 'file';

				// Textarea

				case 'textarea': return 'textarea';
				case 'text_area': return 'textarea';

				// Select box

				case 'countries': return 'select';
				case 'select': return 'select';
				case 'selectbox': return 'select';

				// Checkbox

				case 'checkbox': return 'checkbox';

				// Default input

				case 'text': return 'input';
				case 'default': return 'input';
				case '': return 'input';
				case 'email': return 'input';
				case 'telephone': return 'input';
				case 'phone': return 'input';

				default: return 'input';
    		}
    	}
    },
	name: 'field',
	components: {
		TextInput,
		SelectInput,
		FileInput,
		CheckboxInput,
		TextArea,
		LabelInput
	},
	props: ['data', 'disabled']
}
</script>
<style lang="sass">

.errors
	display: block
	margin-top: 10px
</style>