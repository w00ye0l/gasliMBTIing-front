<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <h1 class="title">Guestbook</h1>
        <!-- 삭제 버튼 -->
        <button type="button" class="button is-light delete__btn" v-on:click="fnDelete">Delete</button>
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
        guestbook: {}
      }
    },
    created() {
      this.getGuestbook()
    },
    methods: {
      async getGuestbook() {
        this.$store.commit('setIsLoading', true)
        
        const guestbookID = this.$route.params.id


        await axios
          .get(`/guestbook/detail/${guestbookID}/`)
          .then(response => {
            console.log(response)
            this.guestbook = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },
      async fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return
        
        const guestbookID = this.$route.params.id
        
        await axios
          .delete(`/guestbook/delete/${guestbookID}/`, this.guestbook)
          .then(() => {
            toast({
                message: '삭제되었습니다.',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$router.push('/dashboard/my-account')
            })
          .catch((err) => {
            console.log(err);
          })

        this.$store.commit('setIsLoading', false)
      },
      elapsedText(date) {
        return dateformat.elapsedText(new Date(date));
      },
    }
  }
</script>

<style>
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