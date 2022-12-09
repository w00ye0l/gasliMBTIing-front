<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">My account</h1>
          
          <div class="col-xs-12 col-sm-4 text-center">
            <figure>
                <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMzFfODcg/MDAxNTE3MzkxNTAxMDkx.M_0YZWPyJdHFTFhy44QVGOefevhQlbp6imgO92lgrWcg.wlSOGUlI6sqwtZX4iOc2PtugEMY0xexfbFqEUyRXRpUg.JPEG.jsrwnmejs/%ED%91%9C%EC%A7%80_%EA%B3%A0%ED%99%94%EC%A7%88ssss.jpg?type=w2" alt="" class="img_profile">
            </figure>
          </div>
          <div>
            <p class="content-font" style="font-size: 20px"><strong>username: </strong> {{ user.username }} </p>
            <p class="content-font" style="font-size: 20px"><strong>nickname: </strong> {{ user.nickname }} </p>
            <p class="content-font" style="font-size: 20px"><strong>mbti: </strong>{{ user.mbti1 }}{{ user.mbti2 }}{{ user.mbti3 }}{{ user.mbti4 }}
              <span class="tags" style="margin-right:5px">{{ user.age }}</span> 
              <span class="tags" style="margin-right:5px">{{ user.gender }}</span>
            </p>
          </div>
          <div class="column is-10">
            <div class="buttons">
              <button @click="logout()" class="button is-danger">Log out</button>
            </div>
          </div>
        </div>
      </div> 
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">방명록</h1>
          <div>
            <p class="content-font" style="font-size: 20px"><strong>username: </strong> </p>
            <p class="content-font" style="font-size: 20px"><strong>Email: </strong>  </p>
            <p class="content-font" style="font-size: 20px"><strong>Info: </strong>
            </p>
          </div>
        </div>
      </div> 
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">친구 분포도</h1>
          <div>
            <div style="width: 100%, text-align: center display: inline-block">
              <p class="" style="font-size: 20px;">
                <strong>I E</strong></p>
                  <div class="bar-container">
                    <div id="content_bar" class="bar1" style="width:55%"></div>
                  </div>           
            </div>
            <div style="width: 100%, text-align: center display: inline-block">
              <p class="" style="font-size: 20px;">
                <strong>N S</strong></p>
                  <div class="bar-container">
                    <div id="content_bar" class="bar2" style="width:55%"></div>
                  </div>           
            </div>
            <div style="width: 100%, text-align: center display: inline-block">
              <p class="" style="font-size: 20px;">
                <strong>T P</strong></p>
                  <div class="bar-container">
                    <div id="content_bar" class="bar3" style="width:55%"></div>
                  </div>           
            </div>
            <div style="width: 100%, text-align: center display: inline-block">
              <p class="" style="font-size: 20px;">
                <strong>P J</strong></p>
                  <div class="bar-container">
                    <div id="content_bar" class="bar4" style="width:55%"></div>
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
        user: ''
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
      }
    }
  }
</script>

<style>

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
}

.bar2 {
height: 20px;
background-color: #FCF6BD;
border-radius: 5px;
}

.bar3 {
height: 20px;
background-color: #D0F4DE;
border-radius: 5px;
}

.bar4 {
height: 20px;
background-color: #A9DEF9;
border-radius: 5px;
}

.img_profile {
  width: 50%;
  height: 50%;
}
</style>

