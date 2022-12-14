<template>
  <div class="main">
    <template v-if="active === 'Home'">
    </template>
    
    <template v-else>
      <div class="home__btn">
        <div class="is-flex is-justify-content-end">
          <!-- 알림 버튼 -->
          <router-link to="/dashboard/notifications" class="bell__link">
            <font-awesome-icon class="icon is-middle" icon="bell" />{{notificationsLength}}
          </router-link>

          <!-- 홈 버튼 -->
          <router-link to="/" class="home__link">
            <font-awesome-icon class="icon is-middle" icon="house" />
          </router-link>
        </div>
      </div>
      <Navbar />
    </template>

    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
      <div class="lds-dual-ring"></div>
    </div>
    
    <section class="section">
      <router-view :key="$route.fullPath"></router-view>
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
    data() {
      return {
        notificationsLength:0
      }
    },
    
    beforeCreate() {
      this.$store.commit('initializeStore')
        
      if (this.$store.state.token) {
        axios.defaults.headers.common['Authorization'] = "Token " + this.$store.state.token
      } else {
        axios.defaults.headers.common['Authorization'] = ""
      }
    },
    mounted(){
      this.getNotification()
      this.loading = setInterval(this.getNotification, 10000);
    },
    methods: {
      async getNotification() {
        await axios
        .get('/community/notification/')
        .then(response => {
          this.notificationsLength = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
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
  font-family: 'KOTRAHOPE' !important;
}

.main {
  position: relative;
  max-width: 650px;
  margin: auto;
  padding: 0;
  min-height: 100vh;
  box-shadow: 0px 0px 20px 5px rgb(199, 199, 199);
}

.home__btn {
  position: absolute;
  top: 3rem;
  right: 6rem;
  z-index: 20;
}

@media screen and (max-width:1023px) {
  .home__btn {
    right: 5rem;
  }
}

@media screen and (max-width:768px) {
  .home__btn {
    right: 2rem;
  }
}

.bell__link {
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  border-radius: 50%;
  border: 1px solid #9c9c9c;
  color: #9c9c9c;
}

.home__link {
  display: flex;
  margin-left: 0.5rem;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #9c9c9c;
  border-radius: 50%;
  color: rgb(255, 255, 255);
}

.bell__link:hover, .home__link:hover {
  color: #3f3e3e;
}

.column {
  margin: auto;
  background: transparent;
}

.section {
  min-height: 93vh;
  padding-bottom: 17vh;
  position: relative;
  width: 100%;
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