<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">
        <h1 class="title">회원 탈퇴</h1>

        <hr>

        <div class="box">
          <div class="body__content_sub">
            탈퇴하시면 지금까지 저장한 모든 정보가 삭제됩니다.😥
            <br>이에 동의하신다면 회원탈퇴를 해주세요.
            <br>gasliMBTIng 서비스를 이용해주셔서 감사합니다.
          </div>

          <form @submit.prevent="fnDelete" class="submit__box">
            <button class="button submit__btn modal-button">
              회원탈퇴
            </button>
          </form>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'

  export default {
    name: 'DeleteAccount',
    data() {
      return {
        user: {},
      }
    },

    methods: {
      async fnDelete() {
        await axios
          .delete(`/accounts/delete`, this.user)
          .then(() => {
            toast({
                message: '정상적으로 탈퇴 되었습니다.',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$router.push('/log-in')
            })
          .catch((err) => {
            console.log(err);
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>

<style>
.title__custom {
  margin: 5vh 0;
  font-size: 8vh;
  text-decoration: underline;
}
.title__m {
  color: #FF99C8;
}
.title__b {
  color: #fff171;
}
.title__t {
  color: #a2f3c1;
}
.title__i {
  color: #88d2f7;
}

.subtitle__custom {
  margin-top: 2vh;
  font-size: 4vh;
}

.modal-button {
  background: #bd32fd;
  color: #fff;
  border-radius: 10rem;
  border: 4px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.5rem #bd32fd;
}

.modal-button:hover {
  background: #9f22da;
  color: #fff;
  box-shadow: 0 0 0 0.5rem #9f22da;
}

.modal-card {
  max-width: 380px;
  border-radius: 1.5rem;
}

.modal-card-head {
  position: relative;
  display: flex;
  justify-content: center;
  border: 0;
  background: #fff;
}

.modal-card-head .delete {
  position: absolute;
  top: 30px;
  right: 30px;
}

.modal__title {
  font-size: 2rem;
}

.modal-card-body {
  background: #fff;
}

.modal-card-foot {
  display: flex;
  justify-content: center;
  border: 0;
  background: #fff;
}

.go__to {
  width: 60%;
  background: #bd32fd;
  color: #fff;
  text-align: center;
  font-size: 2rem;
  border-radius: 3rem;
  border: 4px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.5rem #bd32fd;
}

.go__to:hover {
  background: #9f22da;
  color: #fff;
  box-shadow: 0 0 0 0.5rem #9f22da;
}

.body__head {
  text-align: center;
  margin-bottom: 0.5rem;
  text-align: center;
}

.body__title__img {
  text-align: center;
  width: 15%;
}

.body__title {
  font-size: 2rem;
}

.body__content {
  margin-bottom: 2rem;
}

.body__info {
  padding: 0 2rem;
  color: #868686;
  font-size: 1rem;
}
</style>

