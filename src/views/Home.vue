<template>
  <div class="home">
    <div class="lol is-8">
      <div class="circle circle_1"></div>
      <div class="circle circle_2"></div>
      <div class="circle circle_3"></div>
      <div class="circle circle_4"></div>
      <div class="circle circle_5"></div>
      <div class="circle circle_6"></div>
      <div class="circle circle_7"></div>
      <div class="circle circle_8"></div>
      <div class="circle circle_9"></div>
      <div class="circle circle_10"></div>
      <div class="circle circle_11"></div>
      <div class="circle circle_12"></div>
      <div class="circle circle_13"></div>
      <div class="circle circle_14"></div>
      <div class="circle circle_15"></div>
      <div class="circle circle_16"></div>
    </div>

    <h1 class="title__custom">gasli<span class="title__m">M</span><span class="title__b">B</span><span class="title__t">T</span><span class="title__i">I</span>ng</h1>

    <button class="button is-large modal-button" v-on:click="isShowModal = true">
      MBTI?
    </button>
    <div class="modal" v-bind:class="{ 'is-active': isShowModal }">
    <div class="modal-background" v-on:click="isShowModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h1 class="modal__title">gasli<span class="title__m">M</span><span class="title__b">B</span><span class="title__t">T</span><span class="title__i">I</span>ng</h1>
          <button class="delete" aria-label="close" v-on:click="isShowModal = false"></button>
        </header>

        <section class="modal-card-body">
          <div class="body__head">
            <img class="body__title__img" src="../assets/red.png" alt="">
            <span class="body__title">gasliMBTIng이란?</span>
          </div>
          <div class="body__content">
            <li class="body__info">
              앱 이름의 유래는 MBTI가 가스라이팅이라고 
              <br>느끼는 사람들이 많아 착안했습니다.
            </li>
          </div>

          <div class="body__head">
            <img class="body__title__img" src="../assets/yellow.png" alt="">
            <span class="body__title">친구들의 MBTI 저장</span>
          </div>
          <div class="body__content">
            <li class="body__info">
              이 앱은 주변 사람들의 MBTI 정보를 손쉽게 저장하고 
              <br>간편하게 확인할 수 있도록 하는 사전과 같은 앱입니다.
            </li>
          </div>

          <div class="body__head">
            <img class="body__title__img" src="../assets/green.png" alt="">
            <span class="body__title">MBTI 정보 확인</span>
          </div>
          <div class="body__content">
            <li class="body__info">
              대중적인 MBTI 정보를 통해 내가 과연
              <br>지금의 MBTI가 맞는지 다시 한번 확인해봅시다!
            </li>
          </div>

          <div class="body__head">
            <img class="body__title__img" src="../assets/blue.png" alt="">
            <span class="body__title">커뮤니티</span>
          </div>
          <div class="body__content">
            <li class="body__info">
              커뮤니티 공간에서 서로의 MBTI에 관한 이야기를 통해 
              <br>정말 가스라이팅이 맞는지 판단해봅시다!
            </li>
          </div>
        </section>

        <footer class="modal-card-foot">
          <router-link to="/dashboard/friends" class="go__to">MBTI!</router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isShowModal: false,
    }
  },
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lol {
  position: relative;
  margin-top: 5vh;
  width: 30vh;
  height: 30vh;
  border-radius: 50%;
  background-image: url("../assets/gaslight.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.circle {
  position: absolute;
  width: 2.5vh;
  height: 2.5vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  margin: auto;
}

@for $i from 1 to 5 {
  .circle_#{$i} {
    background-image: url("../assets/flower_red.png");
    -webkit-animation: circle_#{$i} 10s linear infinite;
    animation: circle_#{$i} 10s linear infinite;
  }
}

@for $i from 5 to 9 {
  .circle_#{$i} {
    background-image: url("../assets/flower_green.png");
    -webkit-animation: circle_#{$i} 10s linear infinite;
    animation: circle_#{$i} 10s linear infinite;
  }
}

@for $i from 9 to 13 {
  .circle_#{$i} {
    background-image: url("../assets/flower_blue.png");
    -webkit-animation: circle_#{$i} 10s linear infinite;
    animation: circle_#{$i} 10s linear infinite;
  }
}

@for $i from 13 to 17 {
  .circle_#{$i} {
    background-image: url("../assets/flower_yellow.png");
    -webkit-animation: circle_#{$i} 10s linear infinite;
    animation: circle_#{$i} 10s linear infinite;
  }
}

@for $i from 1 to 17 {
  .circle_#{$i} {
    @-webkit-keyframes circle_#{$i} {
      0% {
        transform: rotate(($i - 1) * 22.5deg)translate(-15vh);
      }
      100% {
        transform: rotate(360 + ($i - 1) * 22.5deg)translate(-15vh);
      }
    }
    
    @keyframes circle_#{$i} {
      0% {
        transform: rotate(($i - 1) * 22.5deg)translate(-15vh);
      }
      100% {
        transform: rotate(360 + ($i - 1) * 22.5deg)translate(-15vh);
      }
    }
  }
}

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
  max-width: 430px;
  border-radius: 1.5rem;
}

.modal-card-head {
  position: relative;
  display: flex;
  justify-content: center;
  border: 0;
  background: #ffffff;
}

.modal-card-head .delete {
  position: absolute;
  top: 30px;
  right: 30px;
}

.modal__title {
  font-size: 3rem;
}

.modal-card-body {
  background: #ffffff;
}

.modal-card-foot {
  display: flex;
  justify-content: center;
  border: 0;
  background: #ffffff;
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
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.body__title__img {
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
