<template lang='pug'>
</template>
<script>
import Base from './Base.vue'
export default {
  	name: 'MetaBase',
    extends: Base,
    components: {
    },
  	computed: {
  	},
  	data() {
  		return {

  		}
  	},
  	methods: {
      
        getMetaTitle() {
          return window.project.meta.title || 'No Title Set';
        },
        getMetaDesc() {
          return window.project.meta.description || 'No Desc Set';
        },
        getMetaImage() {
          return window.location.origin + window.project.meta.image ;
        },
    },
  	mounted() {

  	},
    metaInfo () {
      return {
        title: this.getMetaTitle(),
        description: this.getMetaDesc(),
        meta: [
          { 
            'property': 'og:description', 
            'content': this.getMetaDesc(),
            'vmid': 'og:description'
          },
          { 
            'property': 'og:title', 
            'content': this.getMetaTitle(),
            'vmid': 'og:title'
          },
          { 
            'property': 'og:image', 
            'content': this.getMetaImage(), 
            'vmid': 'og:image'
          },
        ]
      }
    },
    props: []
}
</script>

