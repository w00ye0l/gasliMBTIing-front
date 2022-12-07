<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Add MBTI</h1>
      </div>

      <div class="column is-12">
        <form @submit.prevent="submitForm">

          <div class="field">
            <label>board</label>
            <div class="control">
              <input type="num" class="input" v-model="board">
            </div>
          </div>


          <div class="field">
            <label>MBTI</label>
            <div class="control">
              <select class="select" v-model="mbti">
                <option value="INFP">INFP</option>
                <option value="ENFP">ENFP</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ISFP">ISFP</option>
                <option value="ESFP">ESFP</option>
                <option value="INTP">INTP</option>
                <option value="INFJ">INFJ</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENTP">ENTP</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ISTJ">ISTJ</option>
                <option value="INTJ">INTJ</option>
                <option value="ISPT">ISPT</option>
                <option value="ESTP">ESTP</option>
                <option value="ENTJ">ENTJ</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label>title</label>
            <div class="control">
              <input type="text" class="input" v-model="title">
            </div>
          </div>

          <div class="field">
            <label>Content</label>
            <div class="control">
              <input type="text" class="input" v-model="content">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
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
    name: 'AddMbti',
    data() {
      return {
        board: '',
        mbti: '',
        title: '',
        content: '',
      }
    },
    methods: {
      async submitForm() {
        this.$store.commit('setIsLoading', true)

        const mbit_ = {
          board: this.board,
          mbti: this.mbti,
          title: this.title,
          content: this.content,
        }

        await axios
          .post('MBTI/', mbit_)
          .then(response => {
            console.log(response)

            this.$router.push('/dashboard/mbti/add')
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>