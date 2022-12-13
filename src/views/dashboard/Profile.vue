<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">

        <!-- 회원 정보 -->
        <div class="box">
          <h1 class="title">{{ user.nickname }} 님의 회원정보</h1>
          <div class="profile__info">
            <img :src="user.image" class="img__profile">
            <span>
              <p class="mbti__font"><strong>이메일: </strong> {{ user.username }} </p>
              <p class="mbti__font"><strong>MBTI: </strong>{{ user.mbti1 }}{{ user.mbti2 }}{{ user.mbti3 }}{{ user.mbti4 }} </p>
              <p class="mbti__font"><strong>나이: </strong> {{ user.age }} </p> 
              <p class="mbti__font"><strong>성별: </strong> {{ user.gender }} </p>
            </span>
          </div>
        </div>
      </div> 

      <!-- 방명록 -->
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">방명록</h1>
          <div class="write__div">
            <router-link :to="{ name: 'AddGuestbook', params: { id: Number(user.id) }}" class="write__btn is-light">글쓰기</router-link>
          </div>
          <div v-for="guest in guestlist" v-bind:key="guest.id">
              <router-link class="guest__link" :to="{ name: 'Guestbook', params: { id: guest.id }}">
              <p class="guest__content">{{ guest.name }} | {{ guest.contents }}</p>
              </router-link>
            </div>
        </div>
      </div> 

      <!-- 친구 분포도 -->
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">친구 분포도</h1>
          <div>
            <div class="mbti__friend">
              <div><span class="mbti__left">E</span> <span class="mbti__right">I</span></div>
              <div class="bar__container">
                <div id="content__bar" class="bar1"></div>
              </div> 
            </div>           
            <div class="mbti__friend">
              <div><span class="mbti__left">N</span> <span class="mbti__right">S</span></div>
              <div class="bar__container">
                <div id="content__bar" class="bar2"></div>
              </div>           
            </div>
            <div class="mbti__friend">
              <div><span class="mbti__left">T</span> <span class="mbti__right">F</span></div>
                <div class="bar__container">
                  <div id="content__bar" class="bar3"></div>
                </div>           
            </div>
            <div class="mbti__friend">
              <div><span class="mbti__left">P</span> <span class="mbti__right">J</span></div>
                <div class="bar__container">
                  <div id="content__bar" class="bar4"></div>
                </div>           
            </div>            
          </div>  
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Profile',
    data() {
      return {
        user: {},
        guestlist:[],
      }
    },
    created() {
      this.getUser()
      this.getGuestbook()
    },
    methods: {
      async getUser() {      
        this.$store.commit('setIsLoading', true)

        const userID = this.$route.params.id

        await axios
        .get(`/accounts/${userID}/`)
        .then(response => {
          console.log(response)
          this.user = response.data
          this.user.image = process.env.VUE_APP_API_URL + this.user.image
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      },
      async getGuestbook() {
        this.$store.commit('setIsLoading', true)

        const userID = this.$route.params.id

        await axios
        .get(`/guestbook/${userID}/`)
        .then(response => {
          console.log(response)
          this.guestlist = response.data
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
.profile__info {
  display: flex; 
  align-items: center; 
  justify-content: space-around;
}
.img__profile {
  width: 5rem;
  vertical-align: middle;
}
.mbti__font {
  font-size: 20px;
}
.mbti__font1 {
  font-size: 20px;
  font-weight: bold;
}
.mbti__friend {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  
}
.mbti__left {
  float: left;
  font-weight: bold;
}
.mbti__right {
  float: right;
  font-weight: bold;
}
.bar__container {
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
  border-radius: 5px;
  margin: 0;
}
.bar1 {
  height: 20px;
  background-color: #FF99C8;
  border-radius: 5px;
  width:55%
}
.bar2 {
  height: 20px;
  background-color: #FCF6BD;
  border-radius: 5px;
  width:55%
}
.bar3 {
  height: 20px;
  background-color: #D0F4DE;
  border-radius: 5px;
  width:55%
}
.bar4 {
  height: 20px;
  background-color: #A9DEF9;
  border-radius: 5px;
  width:55%
}
.guest__content {
  font-size: 1.3rem;
}
</style>

