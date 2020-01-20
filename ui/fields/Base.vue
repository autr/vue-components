<template lang="pug">
</template>
<script>


export default {
	name: 'Base',
	mounted: function(){},
	methods: {
		optId(i) {
			let f = this.$props.field.label.toLowerCase().replace(/ /g, "-");
			let l = f + this.$props.field.options[i];
			return l.toLowerCase().replace(/ /g, "-") + 'Id';
		}
	},
	computed: {
		fieldId() {
			let l = this.$props.field.label;
			return l.toLowerCase().replace(/ /g, "-") + 'Id';
		},
		groupId(i) {
			let l = this.$props.field.label;
			return l.toLowerCase().replace(/ /g, "-") + 'GroupId';
		}
	},
	props: {
		field: {
			type: Object,
			required: false,
			default: () => ({
				rules: {
					rows: 7
				},
				name: 'default'
			})
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		options: {
			type: Array,
			required: false,
			default: () => ([ 'A', 'B', 'C' ])
		}
	}
}
</script>
