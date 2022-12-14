<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10 community__head">
        <h1 class="title">커뮤니티</h1>

        <hr>
        
        <div class="write__div">
          <router-link to="/dashboard/community/add" class="write__btn is-light">글쓰기</router-link>
        </div>

        <div class="select__box">
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="category" @change="changeFilter">
                  <option value="카테고리" disabled selected>카테고리</option>
                  <option disabled>=========</option>
                  <option value="전체">전체</option>
                  <option v-for="category in categories"
                    v-bind:key="category" 
                    :value="category"
                  >{{category}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="mbti" @change="changeFilter">
                  <option value="MBTI" disabled selected>MBTI</option>
                  <option disabled>=========</option>
                  <option value="전체">전체</option>
                  <option v-for="mbti in mbtis"
                    v-bind:key="mbti" 
                    :value="mbti"
                  >{{mbti}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="column is-10">
        <div
          class="article box"
          v-for="community in communities"
          v-bind:key="community.id"
        >
        <router-link class="article__link" :to="{ name: 'Community', params: { id: community.id }}">
            <h2 class="article__title">{{ community.title }}
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
            </h2>
            <p class="article__content">{{ community.content }}
              
            </p>
            <div class="article_bottom">
              <div class="article__subcontent">
                <span>{{ elapsedText(community.created_at) }}</span> | 
                <span>{{ community.user.nickname }}</span>
              </div>
              <span class="comment__len">
                <font-awesome-icon class="icon is-small" icon="comment" />
                <span class="comment_cnt">{{ community.commentLength }}</span>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import dateformat from '@/assets/js/dateformat.js';

  export default {
    name: 'Communities',
    data() {
      return {
        communities: [],
        category:'카테고리',
        categories:['자유','질문','상담','토론'],
        mbti:'MBTI',
        mbtis:['ENTP','ENTJ','ENFP','ENFJ','ESTP','ESTJ','ESFP','ESFJ','INTP','INTJ','INFP','INFJ','ISTP','ISTJ','ISFP','ISFJ'],
        commentNums: []
      }
    },
    created() {
      this.getCommunities()
    },
    methods: {
      async getCommunities() {
        this.$store.commit('setIsLoading', true)
        
        await axios
        .get('/community/')
        .then(response => {
          this.communities = response.data.reverse()
          this.commentNums = []
          for (let i=0; i < this.communities.length; i++){
            this.getComment(this.communities[i].id, i)
          }
        })
        
        .catch(error => {
          console.log(error)
        })
          
        this.$store.commit('setIsLoading', false)
      },
      elapsedText(date) {
        return dateformat.elapsedText(new Date(date));
      },
      async changeFilter() {
        this.$store.commit('setIsLoading', true)
        let category = ''
        if (this.category == '자유'){
          category = 'free'
        }else if(this.category == '질문'){
          category ='question'
        }else if(this.category == '상담'){
          category = 'counsel'
        }else if(this.category == '토론'){
          category = 'discussion'
        }else if(this.category == '전체' || this.category == '카테고리'){
          category = 'all'
        }
        let mbti = ''
        if (this.mbti == 'MBTI' || this.mbti == '전체'){
          mbti = 'all'
        }else{
          mbti = this.mbti
        }
        
        const data = category+'&'+mbti
        await axios
        .get(`/community/filter/${data}/`)
        .then(response => {
          this.communities = response.data.reverse()
          this.commentNums = []
          for (let i=0; i < this.communities.length; i++){
            this.getComment(this.communities[i].id, i)
          }
        })
        .catch(error => {
          console.log(error)
        })
        this.$store.commit('setIsLoading', false)
      },
      async getComment(comID, index) {
        this.$store.commit('setIsLoading', true)
        const communityID = comID
        await axios
        .get(`/community/${communityID}/comment/`, communityID)
        .then(response => {
          this.communities[index]['commentLength'] = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
        
        this.$store.commit('setIsLoading', false)
      },
    }
  }
</script>

<style scoped>
.community__head {
  position: relative;
}
.write__div {
  position: sticky;
  top: 6rem;
  display: flex;
  justify-content: center;
}
.write__btn {
  padding: 0.3rem 1.5rem;
  background: #bd32fd;
  color: #fff;
  border-radius: 10rem;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #bd32fd;
}

.write__btn:hover {
  background: #9f22da;
  color: #fff;
  box-shadow: 0 0 0 0.2rem #9f22da;
}

.select__box {
  margin: auto;
  margin-top: 2rem;
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.article__link {
  color: #000;
}
.article {
  transition: 0.5s;
}
.article:hover {
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 40%), 0 0px 0 1px rgb(10 10 10 / 2%);
}
.article__title {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
}
.article__mbti {
  padding: 1px 5px;
  background: var(--bgClr);
  border-radius: 0.5rem;
}
.article__content {
  color: rgb(109, 109, 109);
}
.article_bottom {
  display: flex;
  align-items: center;
  justify-content:space-between;
  color: rgb(109, 109, 109);
}

.article__subcontent {
  color: rgb(109, 109, 109);
}

.comment__len {
  /* display: flex; */
  align-items: center;
  font-size: 1.5rem;
  color: #3f8de7;
}

.comment_cnt {
  margin-left: 0.5rem;
}
</style>