<template>
  <div class="container">
    <div class="columns is-multiline is-centered">
      <div class="column is-10">
        <h1 class="title">MBTI</h1>

        <div class="field">
          <div class="control">
            
            <div class="radio-tile-group">
              
              <div class="input-container">
                <input type="radio" id="dot-1" v-model="filters" value="전체">
                <div class="radio-tile">
                  <label for="dot-1">전체</label>
                </div>
              </div>
              
              <div class="input-container">
                <input type="radio" id="dot-2" v-model="filters" value="상대법">
                <div class="radio-tile">
                  <label for="dot-2">상대법</label>
                </div>
              </div>
              
              <div class="input-container">
                <input type="radio" id="dot-3" v-model="filters" value="주의할 점">
                <div class="radio-tile">
                  <label for="dot-3">주의할 점</label>
                </div>
              </div>
              
              <div class="input-container">
                <input type="radio" id="dot-4" v-model="filters" value="특징">
                <div class="radio-tile">
                  <label for="dot-4">특징</label>
                </div>
              </div>

            </div>


          </div>
        </div>
        
        <hr>

        <router-link to="/dashboard/mbti/add" class="button is-light">글쓰기</router-link>
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

          <!-- <tbody>
            <tr v-for="mbti_ in mbti" v-bind:key="mbti_.id">
              <td>{{ mbti_.mbti }}</td>
              <td>{{ mbti_.title }}</td>
              <td>{{ mbti_.content }}</td>
              <td>
                <router-link :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}">Details</router-link>
              </td>
            </tr>
          </tbody> -->

          <tbody v-if="filters == '전체'">
            <tr v-for="mbti_ in mbti" v-bind:key="mbti_.id">
              <td>{{ mbti_.mbti }}</td>
              <td>{{ mbti_.title }}</td>
              <td>{{ mbti_.content }}</td>
              <td>
                <router-link :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}">Details</router-link>
              </td>
            </tr>
          </tbody>

          <tbody v-if="filters != '전체'">
            <tr v-for="mbti_ in mbti" v-bind:key="mbti_.id">
              <td v-if="(mbti_.board == filters)">{{ mbti_.title }}</td>
              <td v-if="(mbti_.board == filters)">{{ mbti_.mbti }}</td>
              <td v-if="(mbti_.board == filters)">{{ mbti_.content }}</td>
              <td v-if="(mbti_.board == filters)">
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
        mbti: [],
        filters: '전체'
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

<style>
  hr {
    background-color: #EAE4E9;
  }

  .radio-tile-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .input-container {
    position: relative;
    height: 40px;
    width: 80px;
    margin: 0.5rem;
  }

  .input-container input{
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
  }

  .input-container .radio-tile{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 2px solid #EAE4E9;
    border-radius: 10px;
  }

  input:checked + .radio-tile {
    background-color: #EAE4E9;
  }
</style>