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

        <hr>
      </div>

      <!-- 글 -->
      <div class="column is-10 is-center">
        <div class="article__head ">
          <div class="article__user">
            <div class="article__profileImg box">
              <template v-if="community.user.image">
                <img :src="community.user.image" alt="">
                <!-- <img :src="'http://localhost:8000' + community.user.image" alt=""> -->
              </template>
              <template v-else>
                <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMzFfODcg/MDAxNTE3MzkxNTAxMDkx.M_0YZWPyJdHFTFhy44QVGOefevhQlbp6imgO92lgrWcg.wlSOGUlI6sqwtZX4iOc2PtugEMY0xexfbFqEUyRXRpUg.JPEG.jsrwnmejs/%ED%91%9C%EC%A7%80_%EA%B3%A0%ED%99%94%EC%A7%88ssss.jpg?type=w2" alt="">
              </template>
            </div>
            <div class="article__userInfo">
              <router-link class="nickname__link" :to="{ name: 'Profile', params: { id: Number(community.user.id) }}">
                <p>{{ community.user.nickname }}</p>
              </router-link>
              <p>{{ elapsedText(community.created_at) }}</p>
            </div>
          </div>
          
          <!-- 작성 수정 버튼 -->
          <template v-if="community.user.username === now_user.username">
            <div class="edit__delete__btn">
              <router-link :to="{ name: 'EditCommunity', params: { id: Number(community.id) }}" class="button is-light edit__btn">수정</router-link>
              <button type="button" class="button is-light delete__btn" v-on:click="fnDelete">삭제</button>
            </div>
          </template>
        </div>
        
        <!-- 글 제목 -->
        <div>
          <p class="subtitle">{{ community.title }}
            <template v-if="community.mbti === 'INTJ' || community.mbti === 'INTP' || community.mbti === 'ENTJ' || community.mbti === 'ENTP'">
              <span class="article__mbti" style="--bgClr:#fc66ac">{{ community.mbti }}</span>
            </template>
            <template v-if="community.mbti === 'INFJ' || community.mbti === 'INFP' || community.mbti === 'ENFJ' || community.mbti === 'ENFP'">
              <span class="article__mbti" style="--bgClr:#f7e866">{{ community.mbti }}</span>
            </template>
            <template v-if="community.mbti === 'ISFJ' || community.mbti === 'ISTJ' || community.mbti === 'ESFJ' || community.mbti === 'ESTJ'">
              <span class="article__mbti" style="--bgClr:#87f5b1">{{ community.mbti }}</span>
            </template>
            <template v-if="community.mbti === 'ISFP' || community.mbti === 'ISTP' || community.mbti === 'ESFP' || community.mbti === 'ESTP'">
              <span class="article__mbti" style="--bgClr:#66c9fa">{{ community.mbti }}</span>
            </template>
          </p>
          
          <template v-if="community.image !== null">
            <div class="article__imgbox">
              <img :src="community.image" class="article__img">
              <!-- <img :src="'http://localhost:8000' + community.image" class="article__img"> -->
            </div>
          </template>
          <p class="article__content">{{ community.content }}</p>

          <div class="comment__len">
            <font-awesome-icon class="icon is-small" icon="comment" />
            <p class="comment_cnt">{{ comments.length }}</p>
          </div>
        </div>

        <hr>       
        <!-- 댓글 입력창 -->
        <div class="comment__formbox is-10">
          <h1 class="title">댓글</h1>
          <form class="comment__form" @submit.prevent="submitForm">
            <div class="field comment__input">
              <div class="control">
                <input type="text" class="input" v-model="commentContent">
              </div>
            </div>
            
            <div class="field">
              <div class="control">
                <button class="button is-success comment__button">작성</button>
              </div>
            </div>

            
          </form>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
        </div>

        <!-- 댓글 -->
        <div
          v-for="com in comments"
          v-bind:key="com.id"
        >
          <hr>
          <div class="comment__head">
            <div class="comment__user">
              <!-- 댓글 프로필 사진 -->
              <template v-if="com.comment_user.image">
                <div class="comment__user__img box" v-bind:style="{ 'backgroundImage': 'url(' + com.comment_user.image + ')' }">
                <!-- <div class="comment__user__img box" v-bind:style="{ 'backgroundImage': 'url(' + 'http://localhost:8000' + com.comment_user.image + ')' }"> -->
                </div>
              </template>
              <template v-else>
                <div class="comment__user__img" v-bind:style="{ 'backgroundImage': 'url(https://mblogthumb-phinf.pstatic.net/MjAxODAxMzFfODcg/MDAxNTE3MzkxNTAxMDkx.M_0YZWPyJdHFTFhy44QVGOefevhQlbp6imgO92lgrWcg.wlSOGUlI6sqwtZX4iOc2PtugEMY0xexfbFqEUyRXRpUg.JPEG.jsrwnmejs/%ED%91%9C%EC%A7%80_%EA%B3%A0%ED%99%94%EC%A7%88ssss.jpg?type=w2)' }">
                </div>
              </template>

              <p class="comment__user__name">
                <template v-if="com.comment_user.username !== now_user.username">
                  <router-link class="nickname__link" :to="{ name: 'Profile', params: { id: Number(com.comment_user.id) }}">
                    {{ com.comment_user.nickname }}
                  </router-link>
                </template>
                <template v-else>
                  {{ com.comment_user.nickname }}
                </template>
                
                <template v-if="com.comment_user.username === now_user.username">
                  <span>(작성자)</span>
                </template>
              </p>
            </div>

            <template v-if="com.comment_user.username === now_user.username">
              <button type="button" class="button is-light delete__btn" v-on:click="fncomDelete" :data-id="com.id">삭제</button>
            </template>

          </div>

          <p class="comment__content">{{ com.content }}</p>
          <p>{{ elapsedText(com.created_at) }}</p>
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
        now_user: {},
        errors: [],
      }
    },
    created() {
      this.getCommunity()
      this.getComment()
      this.getUser()
    },
    methods: {
      async getCommunity() {
        this.$store.commit('setIsLoading', true)
        const communityID = this.$route.params.id

        await axios
          .get(`/community/${communityID}/`)
          .then(response => {
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
          this.comments = response.data
        })
        .catch(error => {
          console.log(error)
        })
        
        this.$store.commit('setIsLoading', false)
      },
      
      async submitForm() {
        this.errors = []
        
        if (this.commentContent === '') {
          this.errors.push('댓글 내용을 입력해주세요!')
        }
        
        if (!this.errors.length) {
          this.$store.commit('setIsLoading', true)
          
          const communityID = this.$route.params.id
          const makeComment = {
            content: this.commentContent,
          }
          
          await axios
          .post(`/community/${communityID}/comment/create/`, makeComment)
          .then(response => {            
            this.$router.push(`/dashboard/community/${communityID}`, communityID)
          })
          .catch(error => {
            console.log(error)
            
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again!')
            }
          })
          
          this.commentContent = '';
          
          this.getComment()
          
          this.$store.commit('setIsLoading', false)
        }
      },
      async getUser() {      
        this.$store.commit('setIsLoading', true)
        
        await axios
        .get(`/accounts/`)
        .then(response => {
          this.now_user = response.data
        })
        
        .catch(error => {
          console.log(error)
        })
        
        this.$store.commit('setIsLoading', false)
      },

      // 댓글 삭제
      async fncomDelete(event) {
        if (!confirm("삭제하시겠습니까?")) return
        
        const communityID = this.$route.params.id
        const commentID = event.target.getAttribute('data-id')
        
        await axios
          .delete(`/community/${communityID}/comment/delete/${commentID}/`, this.community, this.comment)
          .then(() => {
            toast({
                message: '댓글 삭제되었습니다.',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$router.push(`/dashboard/community/${communityID}`)
              this.getComment()
            })
          .catch((err) => {
            console.log(err);
          })

        this.$store.commit('setIsLoading', false)
      },
    }
  }
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 0;
}
.community__head {
  display: flex;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
  padding: 0;
  width: 4rem;
  height: 4rem;
}
.article__user {
  display: flex;
  justify-content: flex-start;
}
.nickname__link {
  color:#000
}
.nickname__link:hover {
  color:#bd32fd
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
  font-size: 1.4rem;
}
.edit__btn {
  width: 3rem;
  height: 2rem;
  color: rgb(75, 75, 72);
  text-align: center;
  font-size: 1rem;
  line-height: 1rem;
  background: #fff;
  border-radius: 3rem;
  border: 2px dashed rgb(218, 203, 0);
}

.edit__btn:hover {
  background: rgb(218, 203, 0);
  // box-shadow: 0 0 0 0.2rem rgb(136, 136, 136);
}

.delete__btn {
  margin-left: 1rem;
  width: 3rem;
  height: 2rem;
  background: #fff;
  color: #fc4b4b;
  text-align: center;
  font-size: 1rem;
  line-height: 1rem;
  border-radius: 3rem;
  border: 2px dashed #fc4b4b;
}

.delete__btn:hover {
  color: #fff;
  background: #fc4b4b;
  cursor: pointer;
}
.subtitle {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 2.5rem;
}
.article__mbti {
  padding: 0 5px;
  background: var(--bgClr);
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
.comment__formbox {
  padding: 1rem;
  background: rgb(240, 240, 240);
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
.comment__button {
  background: #bd32fd;
  color: #fff;
  border-radius: 2rem;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #bd32fd;
  outline: none;
}

.comment__button:hover {
  background: #9f22da;
  color: #fff;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #9f22da;
  outline: 0;
}
.comment__button:focus {
  border: 2px dashed rgb(255, 255, 255);
  outline: none;
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
.comment__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment__user {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #9b3cf5;
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
</style>