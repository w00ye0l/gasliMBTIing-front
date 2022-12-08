<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">Edit community</h1>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Category</label>
            <div class="control">
              <input type="text" class="input" v-model="community.category">
            </div>
          </div>
          
          <div class="field">
            <label>MBTI</label>
            <div class="control">
              <input type="text" class="input" v-model="community.mbti">
            </div>
          </div>

          <div class="field">
            <label>Title</label>
            <div class="control">
              <input type="text" class="input" v-model="community.title">
            </div>
          </div>

          <div class="field">
            <label>Content</label>
            <div class="control">
              <input type="text" class="input" v-model="community.content">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    
  export default {
    name: 'EditCommunity',
    data() {
      return {
        community: {}
      }
    },
    mounted() {
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
      },
      async submitForm() {
        this.$store.commit('setIsLoading', true)

        const communityID = this.$route.params.id

        await axios
          .put(`/community/update/${communityID}/`, this.community)
          .then(response => {
            this.$router.push(`/dashboard/community/${communityID}`)
          })
          .catch(error => {
            console.log(error)
          })
        
        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>