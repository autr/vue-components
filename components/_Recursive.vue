<template lang='pug'>
  .recursive
    //- span.bracket(v-if="isType === 'object'") {
    .object( v-if="isType === 'object'" ) 
      ul
        li(v-for=" o, id in obj ") 
          a.key {{id}} :  
          .value: recursive( :obj="o" :string="getString" )
      //- span }
    .value( v-if=" (isType === 'string')||(isType === 'number') " )
      span  {{obj}}


</template>
<script>
import Recursive from './_Recursive.vue'
export default {
  	name: 'Recursive',
    componenets: {
      Recursive
    },
  	computed: {
      getString() {

      },
      isType() {
        console.log( typeof this.$props.obj );
        return typeof this.$props.obj;
      },
      thisVar() {
        console.log('yo', this.$props.obj);
        return this.$props.obj;
      }
  	},
  	data() {
  		return {
        appendedString
  		}
  	},
  	methods: {
      
    },
  	mounted() {




  	},
    props: [ 'obj', 'string' ]
}
</script>

