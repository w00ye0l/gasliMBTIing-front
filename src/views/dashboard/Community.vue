<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <h1 class="title">{{ community.title }}</h1>

        <router-link :to="{ name: 'EditCommunity', params: { id: Number(community.id) }}" class="button is-light">Edit</router-link>
      </div>

      <div class="column is-10 is-center">
        <div class="box">
          <h2 class="subtitle">Details</h2>

          <p><strong>Title: </strong>{{ community.title }}</p>
          <p><strong>Category: </strong>{{ community.category }}</p>
          <p><strong>User: </strong>{{ community.user.nickname }}</p>
          <p><strong>MBTI: </strong>{{ community.mbti }}</p>
          <p><strong>Content: </strong>{{ community.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'Community',
    data() {
      return {
        community: {
          user: {},
        },
      }
    },
    created() {
      this.getCommunity()
    },
    methods: {
      async getCommunity() {
        this.$store.commit('setIsLoading', true)
        
        const communityID = this.$route.params.id

        await axios
          .get(`/community/${communityID}/`)
          .then(response => {
            console.log(response)
            this.community = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>