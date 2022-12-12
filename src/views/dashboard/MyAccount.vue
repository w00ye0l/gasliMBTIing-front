<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">{{ user.username }}님의 회원정보</h1>
          <div style="display: flex; align-items: center; justify-content: space-around;">
            <img :src="user.image" class="img_profile">
            <span>
              <p class="mbti_font"><strong>이메일: </strong> {{ user.username }} </p>
              <p class="mbti_font"><strong>닉넴: </strong> {{ user.nickname }} </p>
              <p class="mbti_font"><strong>MBTI: </strong>{{ user.mbti1 }}{{ user.mbti2 }}{{ user.mbti3 }}{{ user.mbti4 }} </p>
              <p class="mbti_font"><strong>나이: </strong> {{ user.age }} </p> 
              <p class="mbti_font"><strong>성별: </strong> {{ user.gender }} </p>
            </span>
          </div>

          <div class="column is-10" style="text-align: center; margin: auto;">
            <div class="buttons" style=" display: inline-block;">
              <router-link :to="{ name: 'EditAccount' }" class="button is-success">프로필 편집</router-link>
              <button @click="logout()" class="button is-danger">로그아웃</button>
            </div>
          </div>
        </div>
      </div> 

      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">방명록</h1>
          <router-link :to="{ name: 'AddGuestbook', params: { id: user.id }}">글쓰기</router-link>
        </div>
      </div> 
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">친구 분포도</h1>
          <div>
            <div class="mbti_friend">
              <div><span class="mbti_left">E</span> <span class="mbti_right">I</span></div>
              <div class="bar-container">
                <div id="content_bar" class="bar1"></div>
              </div> 
            </div>           
            <div class="mbti_friend">
              <div><span class="mbti_left">N</span> <span class="mbti_right">S</span></div>
              <div class="bar-container">
                <div id="content_bar" class="bar2"></div>
              </div>           
            </div>
            <div class="mbti_friend">
              <div><span class="mbti_left">T</span> <span class="mbti_right">F</span></div>
                <div class="bar-container">
                  <div id="content_bar" class="bar3"></div>
                </div>           
            </div>
            <div class="mbti_friend">
              <div><span class="mbti_left">P</span> <span class="mbti_right">J</span></div>
                <div class="bar-container">
                  <div id="content_bar" class="bar4"></div>
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
    name: 'MyAccount',
    data() {
      return {
        user: {},
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      async getUser() {      
        this.$store.commit('setIsLoading', true)

        await axios
        .get(`/accounts/`)
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

        await axios
        .get(`/guestbook/`)
        .then(response => {
          console.log(response)
          this.user = response.data
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      },

      async logout() {
        await axios
          .post('/api/v1/token/logout/')
          .then(response => {
            console.log('Logged out')
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })

        axios.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userid')
        this.$store.commit('removeToken')
        this.$router.push('/')
      },
    }
  }
</script>

<style>
.img_profile {
  width: 5rem;
  vertical-align: middle;
}

.mbti_font {
  font-size: 20px;
}

.mbti_font1 {
  font-size: 20px;
  font-weight: bold;
}

.mbti_friend {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  
}

.mbti_left {
  float: left;
  font-weight: bold;
}

.mbti_right {
  float: right;
  font-weight: bold;
}

.bar-container {
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

</style>

