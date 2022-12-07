<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-10">
        <h1 class="title">Community</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Communities',
    data() {
      return {
        communities: []
      }
    },
    created() {
      this.getCommunities()
    },
    methods: {
      async getCommunities() {
        this.$store.commit('setIsLoading', true)
        
        await axios
        .get('/api/v1/communities/')
        .then(response => {
          console.log(response)
          this.communities = response.data
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>