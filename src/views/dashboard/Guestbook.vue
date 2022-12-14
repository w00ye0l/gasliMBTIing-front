<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <div class="guestbook__head">
          <template v-if="guestbook.receive_user.id != userid">
            <router-link :to="{ name: 'Profile', params: { id: Number(guestbook.receive_user) }}" class="back__btn">
              <font-awesome-icon class="icon is-middle" icon="arrow-left" />
            </router-link>
          </template>
          
          <template v-else>
            <router-link to="/dashboard/my-account" class="back__btn">
              <font-awesome-icon class="icon is-middle" icon="arrow-left" />
            </router-link>
          </template>
          <div>
            <h1 class="title">방명록</h1>
          </div>
        </div>

        <hr>
      </div>
      
      <!-- 방명록 디테일 -->
      <div class="column is-10 is-center">
        <div class="box">
          <div style="display:inline-block">
            <h2 class="subtitle"><span class="guest__name">{{ guestbook.name }}</span> 님에게 온 글</h2>
            <p class="guestdetail__time">{{ elapsedText(guestbook.reg_date) }}</p>
          </div>
          <p class="guestdetail__content">{{ guestbook.contents }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  import { toast } from 'bulma-toast'
  import dateformat from '@/assets/js/dateformat.js';
  
  export default {
    name: 'Guestbook',
    
    data() {
      return {
        guestbook: {},
        username: localStorage.getItem("username"),
        userid: localStorage.getItem("userid"),
      }
    },
    created() {
      this.username,
      this.userid,
      this.getGuestbook()
    },
    methods: {
      async getGuestbook() {
        this.$store.commit('setIsLoading', true)
        
        const guestbookID = this.$route.params.id

        await axios
          .get(`/guestbook/detail/${guestbookID}/`)
          .then(response => {
            this.guestbook = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },
      elapsedText(date) {
        return dateformat.elapsedText(new Date(date));
      },
    }
  }
</script>

<style scoped>
.guestbook__head {
  display: flex;
}
.back__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  color: #363636;
}
.subtitle {
  font-size: 1.6rem;
}
.guestdetail__content {
  font-size: 1.4rem;
}
.guest__name {
  padding: 1px 5px;
  background: #D0F4DE;
  border-radius: 0.5rem;
}
.guestdetail__time {
  color: #b3b3b3;
}
</style>