<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">Friends</h1>

        <router-link to="/dashboard/friends/add">Add Friends</router-link>
      </div>

      <div class="column is-10">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mbti</th>
              <th>Grade</th>
              <th>Group</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="friend in friends"
              v-bind:key="friend.id"
            >
              <td>{{ friend.name }}</td>
              <td>{{ friend.mbti }}</td>
              <td>{{ friend.grade }}</td>
              <td>{{ friend.group }}</td>
              <td>
                <!-- <template v-if="friend.user">
                  {{ friend.user }}
                </template> -->
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
    name: 'Friends',
    data() {
      return {
        friends: []
      }
    },
    created() {
      this.getFriends()
    },
    methods: {
      async getFriends() {
        this.$store.commit('setIsLoading', true)
        
        await axios
        .get('/friends/')
        .then(response => {
          console.log(response)
          this.friends = response.data
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>