<template lang='pug'>
.form-wrapper
	.form(v-if="!success" )
		slot
		field( :data="contact.name", :disabled="disabled" @click.native="updateKey" )
		field( :data="contact.email", :disabled="disabled" @click.native="updateKey" )
		field( :data="contact.message", :disabled="disabled" @click.native="updateKey" )
		button.button( :disabled="disabled" @click="submitForm" ) Send
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
	name: 'ContactForm',
	extends: Base,
	components: {
		TextInput,
		TextArea,
		FormAuto,
		Field
	},
	props: {

	    beforeSend: {
	      type: Function,
	      required: false,
	      default: (obj) => {
	      	return obj;
	      }
	    },
	    href: {
	      type: String,
	      required: true
	    },
	    to: {
	      type: String,
	      required: true
	    }
	},
	computed: {
	},
	data() {
		return {
			disabled: false,
			success: null,
			error: null,
		  	contact: {
		  		name: {
		  			type: "text",
		  			placeholder: "Name",
		  			name: "name",
		  			value: "",
		  		},
		  		email: {
		  			type: "text",
		  			placeholder: "Email",
		  			name: "email",
		  			value: "",
		  			// rules: 'required|email'
		  		},
		  		message: {
		  			type: "textarea",
		  			placeholder: "Message",
		  			name: "message",
		  			value: "",
		  			// rules: 'required'
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

					const full = `${this.contact.name.value} <${this.contact.email.value}>`;
					const url = `${this.$props.href}/send`;
					const currentUrl = window.location.href;
					let data = {
						name: this.contact.name.value,
						from: this.contact.email.value,
						subject: `New [${currentUrl}] contact from ${full}`,
						message: this.contact.message.value,
						to: this.$props.to,
						key: this.makeKey()
					};

					data = this.$props.beforeSend(data);

					console.log(url, data);

					axios.post( url, data ).then( this.onResponse).catch( this.onError );
                }
            });

		},
		onResponse(res) {
			console.log('RES res', res);
			this.success = `Thank you. Message was sent to <strong>${this.$props.to}</strong></br >We will be in contact shortly!`;
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
