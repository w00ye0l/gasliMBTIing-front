<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10 community__head">
        <h1 class="title">커뮤니티</h1>
        
        <div class="write__div">
          <router-link to="/dashboard/community/add" class="write__btn is-light">글쓰기</router-link>
        </div>
      </div>
      
      <div class="column is-10">
        <div
        class="article box"
        v-for="community in communities"
        v-bind:key="community.id"
        >
        <router-link class="article__link" :to="{ name: 'Community', params: { id: community.id }}">
            <h2 class="article__title"><span class="article__mbti">{{ community.mbti }}</span> {{ community.title }}</h2>
            <p class="article__content">{{ community.content }}</p>
            <p class="article__subcontent">
              <span>{{ elapsedText(community.created_at) }}</span> | 
              <span>{{ community.user.nickname }}</span>
            </p>
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
          console.log(response.data)
          this.communities = response.data.reverse()
        })
        
        .catch(error => {
          console.log(error)
        })
          
        this.$store.commit('setIsLoading', false)
      },
      elapsedText(date) {
        return dateformat.elapsedText(new Date(date));
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
  font-size: 1.5rem;
}
.article__mbti {
  padding: 1px 5px;
  background: #FF99C8;
  border-radius: 0.5rem;
}
.article__content, .article__subcontent {
  color: rgb(109, 109, 109);
}
</style>