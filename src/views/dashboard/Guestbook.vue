<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <h1 class="title">Guestbook</h1>

        
        <button type="button" class="button is-light" v-on:click="fnDelete">Delete</button>
      </div>

      <div class="column is-10 is-center">
        <div class="box">
          <h2 class="subtitle">Details</h2>

          <p><strong>name: </strong>{{ guestbook.name }}</p>
          <p><strong>contents: </strong>{{ guestbook.contents }}</p>
          <p><strong>time: </strong>{{ guestbook.reg_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  
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
    }
  }
</script>
