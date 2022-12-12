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
        user_pk:'',
      }
    },
    created() {
        this.getuserid()

    },
    methods: {
        getuserid() {    
            const userId = this.$route.params.id
            console.log(userId)
        },
      async submitForm() {
        
        
        console.log('submit form')
        const guestbook = {
          name: this.name,
          password: this.password,
          contents: this.contents,
        }

        const userId2 = this.$route.params.id
        console.log(userId2)

        await axios
          .post('/guestbook/create/', {guestbook : guestbook, user_pk : this.user_pk })
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