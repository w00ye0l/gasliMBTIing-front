<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">Community</h1>

        <router-link to="/dashboard/communities/add">Add Lead</router-link>
      </div>

      <div class="column is-10">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Mbti</th>
              <th>User</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="community in communities"
              v-bind:key="community.id"
            >
              <td>{{ community.category }}</td>
              <td>{{ community.title }}</td>
              <td>{{ community.mbti }}</td>
              <td>
                <template v-if="community.user">
                  {{ community.user.nickname }}
                </template>
              </td>
              <td>
                <!-- <router-link :to="{ name: 'Community', params: { id: community.id }}">Details</router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
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
        .get('/community/')
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