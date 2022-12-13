<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">방명록 작성하기</h1>

        <hr>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>남길 이름</label>
            <div class="control">
              <input type="text" class="input" v-model="name">
            </div>
          </div>
          
          <div class="field">
            <label>비밀번호</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="field">
            <label>내용</label>
            <div class="control">
              <input type="text" class="input" v-model="contents">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">작성</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'

  export default {
    name: 'AddGuestbook',
    data() {
      return {
        name: '',
        password: '',
        contents: '',
        user:'',
      }
    },
    created() {
      this.getuser()
    },
    methods: {
      async getuser() {
          const guestbookID = this.$route.params.id

          await axios
          .get(`/guestbook/get/${guestbookID}/`)
          .then(response => {
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
          })

      },
      async submitForm() {
                
        console.log('submit form')

        const userID = this.$route.params.id
        console.log(userID)
        const guestbook = {
          receive_user_id: userID,
          name: this.name,
          password: this.password,
          contents: this.contents,
        }
        
        await axios
          .post('/guestbook/create/', guestbook)
          .then(response => {
            toast({
              message: '친구에게 방명록을 남겼어요!',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })

            this.$router.push(`/dashboard/guestbook/${response.data.id}/`)
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>