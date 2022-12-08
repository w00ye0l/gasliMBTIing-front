<template>
  <div class="main">
    <template v-if="active === 'Home'">
    </template>
    
    <template v-else>
      <div class="container">
        <div class="columns is-justify-content-center">
          <div class="column is-flex is-10 is-justify-content-end">
            <router-link to="/">
              <font-awesome-icon class="icon is-middle" icon="house" />
            </router-link>
          </div>
        </div>
      </div>
      <Navbar />
    </template>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
      <div class="lds-dual-ring"></div>
    </div>
    
    <section class="section">
      <router-view/>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import Navbar from '@/components/layout/Navbar'
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  export default {
    name: 'App',
    components: {
      Navbar
    },
    setup() {
      const active = computed({
        get() { 
          return useRoute().name
        },
        set() {

        },
      });
      return {
        active,
      };
    },
    beforeCreate() {
      this.$store.commit('initializeStore')
        
      if (this.$store.state.token) {
        axios.defaults.headers.common['Authorization'] = "Token " + this.$store.state.token
      } else {
        axios.defaults.headers.common['Authorization'] = ""
      }
    }
  }
</script>

<style lang="scss">
@import '../node_modules/bulma';

@font-face {
    font-family: 'KOTRAHOPE';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRAHOPE.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

* {
  font-family: 'KOTRAHOPE';
}

.main {
  max-width: 650px;
  margin: auto;
  padding: 0;
  min-height: 100vh;
  box-shadow: 0px 0px 20px 5px rgb(199, 199, 199);
}

.section {
  min-height: 93vh;
  padding-bottom: 13vh;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>