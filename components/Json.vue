<template lang='pug'>
  .json-view
    h1 Response JSON 
    recursive( v-if="response" :obj="response" )

</template>
<script>
import Base from './Base.vue'
import Recursive from './_Recursive.vue'
export default {
  	name: 'Json',
    extends: Base,
    components: {
      Recursive
    },
  	computed: {
  	},
  	data() {
  		return {

  		}
  	},
  	methods: {
      
    },
  	mounted() {




  	},
    props: []
}
</script>

