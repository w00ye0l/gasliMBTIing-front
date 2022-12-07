<template>
  <div class="home">
    <div class="lol">
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
    <!-- <img class="logo" alt="Vue logo" src="../assets/gasliMBTIng-logo.png"> -->
    <h1 class="title__custom">gasli<span class="title__m">M</span><span class="title__b">B</span><span class="title__t">T</span><span class="title__i">I</span>ng</h1>

    <h2 class="subtitle__custom">gasliMBTIng이 뭔데?</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
  margin-top: 80px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: url("../assets/gaslight.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.circle {
  position: absolute;
  width: 25px;
  height: 25px;
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
        transform: rotate(($i - 1) * 22.5deg)translate(-150px);
      }
      100% {
        transform: rotate(360 + ($i - 1) * 22.5deg)translate(-150px);
      }
    }
    
    @keyframes circle_#{$i} {
      0% {
        transform: rotate(($i - 1) * 22.5deg)translate(-150px);
      }
      100% {
        transform: rotate(360 + ($i - 1) * 22.5deg)translate(-150px);
      }
    }
  }
}

.logo {
  width: 300px;
  background: #EAE4E9;
  border-radius: 20px;
}
.title__custom {
  margin-top: 50px;
  font-size: 80px;
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
  margin-top: 20px;
  font-size: 40px;
}
</style>
