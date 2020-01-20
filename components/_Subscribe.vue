<template lang='pug'>
.form-wrapper
	.form(v-if="!success" )
		field( :data="subscribe.name", :disabled="disabled" @click.native="updateKey" )
		field( :data="subscribe.email", :disabled="disabled" @click.native="updateKey" )
		button( :disabled="disabled" @click="submitForm" ) subscribe
		.errors( v-html="error")
	.success(v-if="success" v-html="success") {{success}}


</template>

<script>

import axios from "axios"
import Base from './Base.vue'
import TextInput from './../ui/fields/TextInput.vue'
import TextArea from './../ui/fields/TextArea.vue'
import FormAuto from './../ui/Form.vue'
import Field from './../ui/Field.vue'

export default {
	name: 'Subscribe',
	extends: Base,
	components: {
		TextInput,
		TextArea,
		FormAuto,
		Field
	},
	computed: {
	},
	data() {
		return {
			disabled: false,
			success: null,
			error: null,
		  	subscribe: {
		  		name: {
		  			type: "text",
		  			placeholder: "Name",
		  			name: "name",
		  			value: "",
		  			// rules: 'required'
		  		},
		  		email: {
		  			type: "text",
		  			placeholder: "Email",
		  			name: "email",
		  			value: "",
		  			// rules: 'required|email'
		  		}
		  	},
		  	keyString: 'afakemailerkeystringjustincasebotsareactuallysmart',
		  	key: null
		}
	},
	watch: {
	},
	methods: {
		updateKey() {
			this.keyString = 'jazzisntdeaditjustsmellsfunny';
		},
		makeKey() {

		    const date = (new Date());
		    const dateString = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDay()}`;
		    this.key = "";
		    for (let i = 0; i < dateString.length; i++) {
		        this.key += this.keyString[parseInt(dateString[i],10)];
		    }
		    return this.key;
		},
		submitForm(e, d) {

			this.$validator.validateAll().then(valid => {
                if (valid) {
					this.disabled = true;
					const full = `${this.subscribe.name.value} <${this.subscribe.email.value}>`;
					const url = `${window.project.site.urls.utility}/send`;
					const data = {
						name: this.subscribe.name.value,
						from: this.subscribe.email.value,
						subject: `New subscriber: ${full}`,
						message: `Don't forget to add ${full} to your list`,
						to: window.project.site.email,
						key: this.makeKey()
					};

					console.log(url, data);

					axios.post( url, data ).then( this.onResponse).catch( this.onError );
                }
            });

		},
		onResponse(res) {
			console.log('RES res', res);
			this.success = `Thank you! Your email address was added to the mailing list.`;
			this.disabled = false;
		},
		onError(err) {
			if (typeof err.response === 'undefined') {
				this.error = 'Network error! Please try again';
			} else {
				this.error = err.response.data;
			}
			this.disabled = false;
		}
	},
	beforeDestroy() {
	},
	mounted() {
	}
}
</script>
