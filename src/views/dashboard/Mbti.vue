<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">MBTI</h1>

        <router-link to="/dashboard/mbti/add">Add MBTI</router-link>
      </div>

      <div class="column is-12">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>MBTI</th>
              <th>title</th>
              <th>content</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="mbti_ in mbti" v-bind:key="mbti_.id">
              <td>{{ mbti_.mbti }}</td>
              <td>{{ mbti_.title }}</td>
              <td>{{ mbti_.content }}</td>
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
    name: 'Mbti',
    data() {
      return {
        mbti: []
      }
    },
    created() {
      this.getMbti()
    },
    methods: {
      async getMbti() {
        this.$store.commit('setIsLoading', true)

        axios
          .get('MBTI/')
          .then(response => {
            this.mbti = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>