<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">커뮤니티 글쓰기</h1>

        <hr>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm" enctype="multipart/form-data" class="box">
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
            <label>Image</label>
            <div>
              <input @change="onInputImage()" type="file" ref="communityimage"/>
            </div>
          </div>

          <div class="field">
            <div class="control submit__box">
              <button class="button submit__btn">Submit</button>
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
        mbtis:['ENTP','ENTJ','ENFP','ENFJ','ESTP','ESTJ','ESFP','ESFJ','INTP','INTJ','INFP','INFJ','ISTP','ISTJ','ISFP','ISFJ'],
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
      },
    }
  }
</script>

<style lang="scss">
  input[type=file]::file-selector-button {
    margin-top: 0.5rem;
    width: 100px;
    height: 40px;
    font-size: 1rem;
    font-family: 'KOTRAHOPE' !important;
    color: rgb(66, 66, 66);
    background: #fff;
    border: 2px dashed #bd32fd;
    border-radius: 2rem;
    cursor: pointer;

    &:hover {
      background: #bd32fd;
      color: #fff;
      border: 2px dashed #fff;
    }
  }

  .submit__box {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .submit__btn {
    height: 2.5rem;
    background: #bd32fd;
    color: #fff;
    text-align: center;
    font-size: 1.3rem;
    border-radius: 3rem;
    border: 2px dashed rgb(255, 255, 255);
    box-shadow: 0 0 0 0.2rem #bd32fd;
  }

  .submit__btn:hover {
    background: #9f22da;
    color: rgb(189, 189, 189);
    box-shadow: 0 0 0 0.2rem #9f22da;
  }
</style>