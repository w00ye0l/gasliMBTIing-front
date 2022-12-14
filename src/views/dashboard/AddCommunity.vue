<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">커뮤니티 글쓰기</h1>

        <hr>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="field">
            <label>Category</label>
            <div class="control">
              <div class="select">
                <select v-model="category">
                  <!-- <option value="Category">Category</option> -->
                  <option v-for="category in categories"
                    v-bind:key="category" 
                    :value="category"
                  >{{category}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>MBTI</label>
            <div class="control">
              <div class="select">
                <select v-model="mbti">
                  <!-- <option value="MBTI">MBTI</option> -->
                  <option v-for="mbti in mbtis"
                    v-bind:key="mbti" 
                    :value="mbti"
                  >{{mbti}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>글 제목</label>
            <div class="control">
              <input type="text" class="input" v-model="title">
            </div>
          </div>

          <div class="field">
            <label>글 내용</label>
            <div class="control">
              <textarea type="text" class="input" v-model="content"></textarea>
            </div>
          </div>

          <div class="field">
            <label>이미지</label>
            <input @change="onInputImage()" type="file" ref="communityimage">
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
  import { toast } from 'bulma-toast'
  export default {
    name: 'AddCommunity',
    data() {
      return {
        category: '자유',
        categories:['자유','질문','상담','토론'],
        mbti: 'ENTP',
        title: '',
        content: '',
        image: '',
        mbtis:['ENTP','ENTJ','ENFP','ENFJ','ESTP','ESTJ','ESFP','ESFJ','INTP','INTJ','INFP','INFJ','ISTP','ISTJ','ISFP','ISFJ']
      }
    },
    methods: {
      async submitForm() {
        const community = {
          category: this.category,
          mbti: this.mbti,
          title: this.title,
          content: this.content,
          image: this.image
        }

        const headers = {
          'content-Type': 'multipart/form-data'
        }

        await axios
          .post('/community/create/', community, {headers})
          .then(response => {
            toast({
              message: '글 작성이 완료되었습니다!',
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
      },

      async onInputImage() {
        this.image = this.$refs.communityimage.files[0]
        return this.image
      }
    }
  }
</script>