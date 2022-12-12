<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">Add Guestbook</h1>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>name</label>
            <div class="control">
              <input type="text" class="input" v-model="name">
            </div>
          </div>
          
          <div class="field">
            <label>password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="field">
            <label>contents</label>
            <div class="control">
              <input type="text" class="input" v-model="contents">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
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
              message: 'The lead was added',
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