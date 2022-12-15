<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">커뮤니티 글 수정</h1>

        <hr>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm" class="box" enctype="multipart/form-data">
          <div class="field">
            <label>카테고리</label>
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
              <input type="text" class="input" v-model="content">
            </div>
          </div>

          <div class="field image__box">
            <label>이미지</label>
            <img :src="community.image" alt="">
            <!-- <input name="upfile[]" @change="onInputImage()" type="file" ref="communityimage" accept="image/*"> -->
            <input type="file" @change="onInputImage()" ref="communityimage">
          </div>

          <div class="field">
            <div class="edit__delete__btn">
              <button class="button edit__btn">수정</button>
              <router-link :to="{ name: 'Communities' }" class="button delete__btn">취소</router-link>
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
    name: 'EditCommunity',
    data() {
      return {
        title: '',
        category: '',
        categories:['자유','질문','상담','토론'],
        mbti: '',
        content: '',
        image: '',
        community: {},
        mbtis:['ENTP','ENTJ','ENFP','ENFJ','ESTP','ESTJ','ESFP','ESFJ','INTP','INTJ','INFP','INFJ','ISTP','ISTJ','ISFP','ISFJ'],
      }
    },
    mounted() {
      this.getCommunity()
    },
    methods: {
      async getCommunity() {
        this.$store.commit('setIsLoading', true)
        
        const communityID = this.$route.params.id

        await axios
          .get(`/community/${communityID}/`)
          .then(response => {
            this.community = response.data,
            this.category = this.community.category,
            this.mbti = this.community.mbti,
            this.title = this.community.title,
            this.content = this.community.content,
            this.image = this.community.image
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },
      async submitForm() {
        this.$store.commit('setIsLoading', true)

        const communityID = this.$route.params.id

        const formData = {
            category: this.category,
            mbti: this.mbti,
            title: this.title,
            content: this.content,
            image: this.$refs.communityimage.files[0],
        }

        const headers = {
            'content-Type': 'multipart/form-data'
        }

        await axios
          .put(`/community/update/${communityID}/`, formData, {headers})
          .then(response => {
            toast({
              message: '글이 수정되었습니다!',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })

            this.$router.push(`/dashboard/community/${communityID}`)
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

<style scoped>
.image__box {
  display: flex;
  flex-direction: column;
}

.edit__delete__btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.4rem;
}

.edit__btn {
  width: 5rem;
  height: 2.5rem;
  color: rgb(75, 75, 72);
  text-align: center;
  font-size: 1.5rem;
  line-height: 1rem;
  background: rgb(241, 227, 21);
  border-radius: 3rem;
  border: 2px dashed #fff;
  box-shadow: 0 0 0 2px rgb(241, 227, 21);
}

.edit__btn:hover {
  background: rgb(218, 203, 0);
  box-shadow: 0 0 0 2px rgb(218, 203, 0);
}

.delete__btn {
  margin-left: 1rem;
  width: 5rem;
  height: 2.5rem;
  background: #fc4b4b;
  color: #ffffff;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1rem;
  border-radius: 3rem;
  border: 2px dashed #fff;
  box-shadow: 0 0 0 2px #fc4b4b;
}

.delete__btn:hover {
  color: #fff;
  background: #cc2525;
  cursor: pointer;
  box-shadow: 0 0 0 2px #cc2525;
}
</style>