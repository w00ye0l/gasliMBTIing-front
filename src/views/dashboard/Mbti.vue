<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">MBTI 정보</h1>

        <hr>

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

        <!-- <router-link to="/dashboard/mbti/add" class="button is-light">글쓰기</router-link> -->
      </div>
      
      <template v-if="filters !== '전체'">
        <div class="board-group column is-10">
          <template v-for="mbti_ in mbti">
            <router-link class="board box" :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}" v-if="(mbti_.board === filters)" v-bind:key="mbti_.id">
              {{mbti_.title}}
            </router-link>
          </template>
        </div>
      </template>
      
      <template v-if="filters === '전체'">
        <div class="board-group column is-10">
          <div class="board" v-for="mbti_ in mbti" v-bind:key="mbti_.id">
            <router-link class="board__link box" :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}">
              {{mbti_.title}}
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
          .get('/mbti/')
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

<style scoped>
  label{
    font-size: small;
  }

  .radio-tile-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .input-container {
    position: relative;
    width: 70px;
    height: 40px;
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
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #c961fa;
    border-radius: 2rem;
  }

  .radio-tile label {
    font-size: 1.2rem;
  }

  input:checked + .radio-tile {
    color: #fff;
    background-color: #c961fa;
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

  .board:hover {
  box-shadow: 0 0.5em 1em -0.125em rgba(133, 46, 248, 0.4), 0 0px 0 1px rgba(80, 41, 117, 0.02);
  }

  a {
    color: black;
    font-size: 1.5rem;
  }
  
  .board__link {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .board__link:hover {
    border: 0;
    box-shadow: none;
  }

</style>