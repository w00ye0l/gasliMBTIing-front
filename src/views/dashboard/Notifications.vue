<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10 community__head">
        <h1 class="title">알림</h1>
        <hr>
      </div>
      
      <div class="column is-10">
        <div
          class="article box"
          v-for="notification in notifications"
          v-bind:key="notification.id"
        >
        <router-link class="article__link" :to="{ name: 'Community', params: { id: notification.community.id }}">
            <!-- <h2 class="article__title">{{ community.title }}<span class="article__mbti">{{ notification.mbti }}</span></h2> -->
            <p class="article__content">'{{ notification.send_user.nickname }}' 님이  '{{ notification.community.title }}'글 에 '{{ notification.comment.content }}'댓글을 남기셨습니다 
            </p>
            <!-- <button @click="isRead" :data-id="notification.id">읽음 확인 버튼</button> -->
            <div class="article_bottom">
              <div class="article__subcontent">
                <span>{{ elapsedText(notification.comment.created_at) }}</span> | 
              </div>
              <span class="comment__len">
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
    name: 'Notifications',
    data() {
      return {
        notifications:[]
      }
    },
    created() {
      this.getNotification()
    },
    mounted(){
      this.allRead()
    },
    methods: {
      async getNotification() {
        this.$store.commit('setIsLoading', true)
        
        await axios
        .get('/community/notification/')
        .then(response => {
          this.notifications = response.data
        })
        .catch(error => {
          console.log(error)
        })
        this.$store.commit('setIsLoading', false)
      },
      async isRead(event) {
        const dataId = event.target.getAttribute('data-id')
        await axios
        .put(`/community/isread/${dataId}/`)
        .then(response => {
          this.notifications = response.data
          this.getNotification()
        })
        .catch(error => {
          console.log(error)
        })
        this.$store.commit('setIsLoading', false)
      },
      async allRead(event) {
        await axios
        .put(`/community/allread/`)
        .then(response => {
          console.log('알림 읽음처리 완료')
          // this.notifications = response.data
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
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
}
.article__mbti {
  padding: 1px 5px;
  background: #FF99C8;
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