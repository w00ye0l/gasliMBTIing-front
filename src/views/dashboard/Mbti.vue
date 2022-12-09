<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
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
      
      <template v-if="filters !== '전체'">
        <div class="board-group column is-10">
          <template v-for="mbti_ in mbti">
            <div class="board box" v-if="(mbti_.board === filters)" v-bind:key="mbti_.id">
              <router-link :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}">
                {{mbti_.mbti}}
                {{mbti_.board}}
              </router-link>
            </div>
          </template>
        </div>
      </template>
      
      <template v-if="filters === '전체'">
        <div class="board-group column is-10">
          <div class="board box" v-for="mbti_ in mbti" v-bind:key="mbti_.id">
            <router-link :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}">
              {{mbti_.mbti}}
              {{mbti_.board}}  
            </router-link>
          </div>
        </div>
      </template>


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
  label{
    font-size: small;
  }
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
    width: 60px;
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
  
  .board-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .board {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 45%;
    margin-bottom: 10px;
    border-radius: 10px;
  }


</style>