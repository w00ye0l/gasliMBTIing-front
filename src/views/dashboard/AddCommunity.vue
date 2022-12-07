<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">Add community</h1>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Category</label>
            <div class="control">
              <input type="text" class="input" v-model="category">
            </div>
          </div>
          
          <div class="field">
            <label>MBTI</label>
            <div class="control">
              <input type="text" class="input" v-model="mbti">
            </div>
          </div>

          <div class="field">
            <label>Title</label>
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

          <!-- 카테고리 예시 -->
          <!-- <div class="field">
            <label>Category</label>
            <div class="control">
              <div class="select">
                <select v-model="category">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="inprogress">In progress</option>
                  <option value="lost">Lost</option>
                  <option value="won">Won</option>
                </select>
              </div>
            </div>
          </div> -->

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

  import { toast } from 'bulma-toast'

  export default {
    name: 'AddCommunity',
    data() {
      return {
        category: '',
        mbti: '',
        title: '',
        content: '',
      }
    },
    methods: {
      async submitForm() {
        this.$store.commit('setIsLoading', true)
        
        console.log('submit form')
        const community = {
          category: this.category,
          mbti: this.mbti,
          title: this.title,
          content: this.content,
        }

        await axios
          .post('/community/create/', community)
          .then(response => {
            toast({
              message: 'The lead was added',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })

            this.$router.push('/dashboard/community')
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>