<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <h1 class="title">{{ community.title }}</h1>

        <router-link :to="{ name: 'EditCommunity', params: { id: Number(community.id) }}" class="button is-light">Edit</router-link>&nbsp;
        <router-link to="/dashboard/community" class="button is-light">Home</router-link>&nbsp;
        <button type="button" class="button is-light" v-on:click="fnDelete">Delete</button>
      </div>

      <div class="column is-10 is-center">
        <div class="box">
          <h2 class="subtitle">Details</h2>

          <p><strong>Title: </strong>{{ community.title }}</p>
          <p><strong>Category: </strong>{{ community.category }}</p>
          <p><strong>User: </strong>{{ community.user.nickname }}</p>
          <p><strong>MBTI: </strong>{{ community.mbti }}</p>
          <p><strong>Content: </strong>{{ community.content }}</p>
          <p><strong>Image: </strong><img :src="community.image"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'
  
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
      },
      async fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return

        const communityID = this.$route.params.id

        await axios
          .delete(`/community/delete/${communityID}/`, this.community)
          .then(() => {
            toast({
              message: '삭제되었습니다.',
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
            this.$router.push(`/dashboard/community`)
          }).catch((err) => {
            console.log(err);
          })
        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>