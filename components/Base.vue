<template lang='pug'>
  .base-wrapper
    //- p {{$store.state}}

</template>
<script>

export default {
  	name: 'Base',
  	computed: {
      store() {
        return this.$store.state;
      },
      isLoaded(id) {
        return (this.$store.state[id] !== null);
      }
  	},
  	data() {
  		return {
        response: {},
        promise: null,
        containTargets: []
  		}
  	},
  	methods: {
        linkify( url ) {
          if (url.substring( 0, 4) !== 'http') return `http://${url}`;
          return url;
        },
        addClasses(list) {
          let classes = {};
          list.forEach( l => {
            classes[l] = true;
          });
          return classes;
        },
        contain() {

        },
        containInParent( el ) {

          if (!el) {
            console.warn('Cannot containInParent undefined');
            return;
          }

          if ( this.containTargets.length == 0 ) {
            window.addEventListener( 'resize', this.onResize );
          }
          this.containTargets.push( el );
          this.onResize();

        },
        onResize() {
          this.containTargets.forEach( t => {

            const el = t.$el;
            const parent = t.$el.parentElement;
            // console.log(el, parent);

            const wrap = this.$refs.wrapper;
            const w1 = parent.offsetWidth;
            const h1 = parent.offsetHeight;
            const w2 = el.offsetWidth;
            const h2 = el.offsetHeight;
            const r1 = w1/h1;
            const r2 = w2/h2;
            el.style.transformOrigin = '50% 0%';

            if (r1 < r2) {
             el.style.transform = ` scale(${h1/h2}, ${h1/h2} ) `;
            } else {
             el.style.transform = ` scale(${w1/w2}, ${w1/w2} ) `;
            }


          });
        },
        stripHtml( html ) {
          const div = document.createElement("div");
          div.innerHTML = html;
          return div.innerText;
        } 
    },
    beforeDestroy() {
      this.containTargets = [];
      window.removeEventListener( 'resize', this.onResize );
    },
  	mounted() {


      if (this.$props.data) {

        let promises = [];
        this.$store.commit('loading');

        this.$props.data.forEach( (id, i) => {

          /*--- load new data into this.state.response --*/

          promises.push( 
            this.$store.dispatch('getFromApi', id).then( (response) => {
              this.$set( this.response, id, response );
            }).catch( (err) => {
              reject(err);
            })
          );

          /*--- handle Promise.all and apiState --*/

          this.promise = Promise.all( promises );
          this.promise.then( (res)=> {
              const t = this;
              const time = 0;
              setTimeout( () => {
                t.$store.commit('success');
              }, time);
          }).catch( err => {
            this.$store.commit('error');
          });

        });

      }


  	},
    props: ['data']
}
</script>

