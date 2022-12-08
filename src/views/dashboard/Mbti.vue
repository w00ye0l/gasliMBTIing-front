<template>
  <div class="container">
    <div class="columns is-multiline is-centered">
      <div class="column is-10">
        <h1 class="title">MBTI</h1>

        <!-- <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="mbtis">
                <option value="MBTI">MBTI</option>
                <option v-for="mbti_ in mbti" v-bind:key="mbti_id" value="{{mbti_.mbti}}">{{mbti_.mbti}}</option>
              </select>
            </div>
          </div>
        </div> -->

        <router-link to="/dashboard/mbti/add">Add MBTI</router-link>
      </div>

      <div class="column is-10">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>MBTI</th>
              <th>title</th>
              <th>content</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="mbti_ in mbti" v-bind:key="mbti_.id">
              <td>{{ mbti_.mbti }}</td>
              <td>{{ mbti_.title }}</td>
              <td>{{ mbti_.content }}</td>
              <td>
                <router-link :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}">Details</router-link>
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
          .get('/MBTI/')
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