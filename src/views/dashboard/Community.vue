<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <!-- 커뮤니티 헤드 -->
        <div class="community__head">
          <router-link to="/dashboard/community" class="back__btn">
            <font-awesome-icon class="icon is-middle" icon="arrow-left" />
          </router-link>

          <div>
            <h1 class="title">커뮤니티</h1>
            <p class="article__category">{{ community.category }}</p>
          </div>
        </div>
      </div>
      
      <!-- 글 -->
      <div class="column is-10 is-center">
        <div class="article__head ">
          <div class="article__user">
            <div class="article__profileImg">
              <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMzFfODcg/MDAxNTE3MzkxNTAxMDkx.M_0YZWPyJdHFTFhy44QVGOefevhQlbp6imgO92lgrWcg.wlSOGUlI6sqwtZX4iOc2PtugEMY0xexfbFqEUyRXRpUg.JPEG.jsrwnmejs/%ED%91%9C%EC%A7%80_%EA%B3%A0%ED%99%94%EC%A7%88ssss.jpg?type=w2" alt="">
            </div>
            <div class="article__userInfo">
              <p>{{ community.user.nickname }}</p>
              <p>{{ elapsedText(community.created_at) }}</p>
            </div>
          </div>
          
          <!-- 작성 수정 버튼 -->
          <div class="edit__delete__btn">
            <router-link :to="{ name: 'EditCommunity', params: { id: Number(community.id) }}" class="button is-light ">Edit</router-link>
            <button type="button" class="button is-light delete__btn" v-on:click="fnDelete">Delete</button>
          </div>
        </div>
        
        <div class="">
          <!-- 글 제목 -->
          <p class="subtitle">{{ community.title }} <span class="article__mbti">{{ community.mbti }}</span></p>
          
          <template v-if="community.image !== null">
            <div class="article__imgbox">
              <img :src="community.image" class="article__img">
            </div>
          </template>
          <p class="article__content">{{ community.content }}</p>

          <div class="comment__len">
            <font-awesome-icon class="icon is-small" icon="comment" />
            <p class="comment_cnt">{{ comments.length }}</p>
          </div>
        </div>

        <hr>
        <!-- 댓글 -->
        <div class="">
          <div
            v-for="com in comments"
            v-bind:key="com.id"
          >
            <div class="comment__user">
              <div class="comment__user__img" v-bind:style="{ 'backgroundImage': 'url(' + 'http://localhost:8000' + com.comment_user.image + ')' }">
                <!-- <img class="comment__user__img" :src="" alt=""> -->
              </div>
              <p class="comment__user__name">{{ com.comment_user.nickname }}</p>
            </div>
            <p class="comment__content">{{ com.content }}</p>
            <hr>
          </div>
        </div>
        
        <!-- 댓글 입력창 -->
        <div class="comment__formbox">
          <h1 class="title">댓글</h1>
          <form class="comment__form" @submit.prevent="submitForm">
            <div class="field comment__input">
              <div class="control">
                <input type="text" class="input" v-model="commentContent">
              </div>
            </div>
            
            <div class="field">
              <div class="control">
                <button class="button is-success">작성</button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'
  import dateformat from '@/assets/js/dateformat.js';
  
  export default {
    name: 'Community',
    data() {
      return {
        community: {
          user: {},
        },
        comments: [],
        makeComment: {},
        commentContent: '',
      }
    },
    created() {
      this.getCommunity();
      this.getComment();
    },
    methods: {
      async getCommunity() {
        this.$store.commit('setIsLoading', true)
        
        const communityID = this.$route.params.id

        await axios
          .get(`/community/${communityID}/`)
          .then(response => {
            console.log(response)
            this.community = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },

      async fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return
        
        const communityID = this.$route.params.id
        
        await axios
          .delete(`/community/delete/${communityID}/`, this.community)
          .then(() => {
            toast({
                message: '삭제되었습니다.',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$router.push('/dashboard/community')
            })
          .catch((err) => {
            console.log(err);
          })

        this.$store.commit('setIsLoading', false)
      },

      elapsedText(date) {
        return dateformat.elapsedText(new Date(date));
      },

      async getComment() {
        this.$store.commit('setIsLoading', true)
        
        const communityID = this.$route.params.id

        await axios
          .get(`/community/${communityID}/comment/`, communityID)
          .then(response => {
            console.log(response)
            this.comments = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },
      
      async submitForm() {
        this.$store.commit('setIsLoading', true)

        const communityID = this.$route.params.id
        const makeComment = {
          content: this.commentContent,
        }
        
        await axios
          .post(`/community/${communityID}/comment/create/`, makeComment)
          .then(response => {
            console.log(response)
            console.log(response.data)
            
            this.$router.push(`/dashboard/community/${communityID}`, communityID)
          })
          .catch(error => {
            console.log(error)
          })

        this.getComment()

        this.$store.commit('setIsLoading', false)
      },
    }
  }
</script>

<style lang="scss" scoped>
.community__head {
  display: flex;
  margin-bottom: 1rem;
}
.back__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  color: #363636;
}
.title {
  font-size: 1.5rem;
  margin: 0;
}
.article__category {
  font-size: 1.5rem;
  color: #797979;
}
.article__head {
  display: flex;
  justify-content: space-between;
}
.article__profileImg {
  margin-right: 1.5rem;
  width: 20%;
  border-radius: 2rem;
}
.article__user {
  display: flex;
  justify-content: flex-start;
}
.article__userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.3rem;
}
.edit__delete__btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.delete__btn {
  margin-left: 0.5rem;
}
.subtitle {
  margin-top: 1rem;
  font-size: 2.5rem;
}
.article__mbti {
  padding: 1px 5px;
  background: #FF99C8;
  border-radius: 0.5rem;
}
.article__imgbox {
  display: flex;
  justify-content: center;
}
.article__img {
  border: 1px solid #b3b3b3;
  border-radius: 1rem;
  margin-bottom: 1rem;
}
.article__content {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #7a7a7a;
}
.comment__len {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #3f8de7;
}
.comment_cnt {
  margin-left: 0.5rem;
}
.comment__user {
  display: flex;
  align-items: center;
}
.comment__user__img {
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0.5rem;
}
.comment__user__name {
  font-size: 1.5rem;
}
.comment__content {
  font-size: 1.5rem;
  color: #7a7a7a;
}
.comment__formbox {
  bottom: 7rem;
  background: #fff;
}
.comment__form {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.comment__input {
  width: 80%;
}
</style>