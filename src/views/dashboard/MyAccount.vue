<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">My account</h1>

            <div style="display: flex; align-items: center; justify-content: space-around;">
              <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMzFfODcg/MDAxNTE3MzkxNTAxMDkx.M_0YZWPyJdHFTFhy44QVGOefevhQlbp6imgO92lgrWcg.wlSOGUlI6sqwtZX4iOc2PtugEMY0xexfbFqEUyRXRpUg.JPEG.jsrwnmejs/%ED%91%9C%EC%A7%80_%EA%B3%A0%ED%99%94%EC%A7%88ssss.jpg?type=w2" alt="" class="img_profile" style="vertical-align:middle;">
              <span>
                <p class="mbti_font"><strong>이름: </strong> {{ user.username }} </p>
                <p class="mbti_font"><strong>닉넴: </strong> {{ user.nickname }} </p>
                <p class="mbti_font"><strong>mbti: </strong>{{ user.mbti1 }}{{ user.mbti2 }}{{ user.mbti3 }}{{ user.mbti4 }} </p>
                <p class="mbti_font"><strong>나이: </strong> {{ user.age }} </p> 
                <p class="mbti_font"><strong>성별: </strong> {{ user.gender }} </p>
              </span>
            </div>

          <div class="column is-10" style="text-align: center; margin: auto;">
            <div class="buttons" style=" display: inline-block;">
              <button @click="logout()" class="button is-danger">Log out</button>
            </div>
          </div>
        </div>
      </div> 

      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">방명록</h1>
          <div>
            <p class="mbti_font"><strong>username: </strong> </p>
            <p class="mbti_font"><strong>Email: </strong>  </p>
            <p class="mbti_font"><strong>Info: </strong>
            </p>
          </div>
        </div>
      </div> 
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">친구 분포도</h1>
          <div>
            <div>
              <div class="mbti_font" style="display: flex;flex-direction: column;">
                <div><span style="float: left;"><strong>E</strong></span> <span style="float: right;"><strong>I</strong></span></div>
                  <div class="bar-container">
                    <div id="content_bar" class="bar1" style="width:55%"></div>
                  </div>           
            </div>
            <div class="mbti_font" style="display: flex;flex-direction: column;">
              <div><span style="float: left;"><strong>N</strong></span> <span style="float: right;"><strong>S</strong></span></div>
                  <div class="bar-container">
                    <div id="content_bar" class="bar2" style="width:55%"></div>
                  </div>           
            </div>
            <div class="mbti_font" style="display: flex;flex-direction: column;">
              <div><span style="float: left;"><strong>T</strong></span> <span style="float: right;"><strong>F</strong></span></div>
                  <div class="bar-container">
                    <div id="content_bar" class="bar3" style="width:55%"></div>
                  </div>           
            </div>
            <div class="mbti_font" style="display: flex;flex-direction: column;">
              <div><span style="float: left;"><strong>P</strong></span> <span style="float: right;"><strong>J</strong></span></div>
                  <div class="bar-container">
                    <div id="content_bar" class="bar4" style="width:55%"></div>
                  </div>           
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
.mbti_font {
  font-size: 20px;
  
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
  width: 15rem;
}
</style>

