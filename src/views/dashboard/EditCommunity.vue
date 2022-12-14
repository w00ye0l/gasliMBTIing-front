<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">커뮤니티 글 수정</h1>

        <hr>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm" class="box">
          <div class="field">
            <label>Category</label>
            <div class="control">
              <input type="text" class="input" v-model="community.category">
            </div>
          </div>
          
          <div class="field">
            <label>MBTI</label>
            <div class="control">
              <input type="text" class="input" v-model="community.mbti">
            </div>
          </div>

          <div class="field">
            <label>글 제목</label>
            <div class="control">
              <input type="text" class="input" v-model="community.title">
            </div>
          </div>

          <div class="field">
            <label>글 내용</label>
            <div class="control">
              <input type="text" class="input" v-model="community.content">
            </div>
          </div>

          <div class="field">
            <label>이미지</label>
            <img :src="community.image" alt="">
            <input @change="onInputImage()" type="file" ref="communityimage">
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
    
  export default {
    name: 'EditCommunity',
    data() {
      return {
        community: {}
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
            this.community = response.data
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
            image: this.image,
        }

        const headers = {
            'content-Type': 'multipart/form-data'
        }

        await axios
          .put(`/community/update/${communityID}/`, formData, {headers})
          .then(response => {
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
.edit__delete__btn {
  display: flex;
  justify-content: flex-left;
  align-items: center;
  font-size: 1.4rem;
}
.edit__btn {
  background: #f5e691;
}
.edit__btn:hover {
  background: #f0da62;
}
.delete__btn {
  margin-left: 0.5rem;
  background: #fd8383;
}
.delete__btn:hover {
  background: #f35c5c;
}
</style>