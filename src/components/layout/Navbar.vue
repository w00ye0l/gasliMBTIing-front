<template>
  <nav class="navbar__custom is-fixed-bottom">
    <div class="navbar__menu">
      <div class="navbar__item">
        <div class="buttons">
          <router-link to="/dashboard/friends" class="btn__custom" :class="{ active: active === 'Friends' }" @click="active = 'Friends'" style="--clr:#FF99C8">
            <font-awesome-icon class="icon is-middle" icon="address-book" />
          </router-link>

          <router-link to="/dashboard/mbti" class="btn__custom" :class="{ active: active === 'Mbti' || active === 'AddMbti' }" @click="active = 'Mbti'" style="--clr:#FCF6BD">
            <font-awesome-icon class="icon is-middle" icon="book" />
          </router-link>

          <router-link to="/dashboard/community" :class="{ active: active === 'Communities' || active === 'Community' || active === 'AddCommunity' || active === 'EditCommunity' }" @click="active = 'Communities'" class="btn__custom" style="--clr:#D0F4DE">
            <font-awesome-icon class="icon is-middle" icon="comments" />
          </router-link>
          
          <template v-if="!$store.state.isAuthenticated">
            <router-link to="/log-in" class="btn__custom" :class="{ active: active === 'LogIn' || active === 'SignUp' }" @click="active = 'LogIn'" style="--clr:#A9DEF9">
              <font-awesome-icon class="icon is-middle" icon="right-to-bracket" />
            </router-link>
          </template>
          
          <template v-else>
            <router-link to="/dashboard/my-account" :class="{ active: active === 'MyAccount' }" @click="active = 'MyAccount'" class="btn__custom" style="--clr:#A9DEF9">
              <font-awesome-icon class="icon is-middle" icon="circle-user" />
            </router-link>
          </template>
          <!-- <div class="indicator"></div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  export default {
    name: 'Navbar',
    setup() {
      const active = computed({
        get() { 
          return useRoute().name
        },
        set() {

        },
      });
      return {
        active,
      };
    }
  }
</script>

<style scoped lang="scss">
.navbar__custom {
  position: fixed;
  bottom: 0;
  margin: auto;
  max-width: 650px;
  width: 100%;
  height: 80px;
  background: #EAE4E9;
  z-index: 20;
}
.navbar__menu {
  width: 100%;
  height: 100%;
}
.navbar__item {
  height: 100%;
}
.buttons {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.btn__custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: 0;
  border-radius: 50%;
  outline: 0;
  color: rgb(74, 74, 74);
  transition: 0.7s;
}
.btn__custom::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--clr);
  border-radius: 50%;
  filter: blur(5px);
  opacity: 0;
  z-index: -1;
}
.btn__custom.active {
  background: var(--clr);
  transform: translateY(-40px);
  box-shadow: 0 0 0 0.7rem #EAE4E9;
}
.btn__custom.active::before {
  opacity: 0.5;
}
router-link {
  border: 0;
  outline: none;
}
// .btn__custom {
//   position: absolute;
//   top: -45px;
//   left: -80px;
//   width: 90px;
//   height: 90px;
//   background: #EAE4E9;
//   border-radius: 50%;
//   z-index: -2;
//   transition: 0.5s;
// }
// .btn__custom::before {
//   content: '';
//   position: absolute;
//   top: 14px;
//   left: -28px;
//   width: 30px;
//   height: 30px;
//   background: transparent;
//   border-radius: 50%;
//   box-shadow: 15px 18px #EAE4E9;
// }
// .btn__custom::after {
//   content: '';
//   position: absolute;
//   top: 14px;
//   right: -28px;
//   width: 30px;
//   height: 30px;
//   background: transparent;
//   border-radius: 50%;
//   box-shadow: -15px 18px #EAE4E9;
// }

@for $i from 1 to 5 {
  .buttons :nth-child(#{$i}).active ~ .indicator {
    transform: translateX(calc(144px * $i));
  }
}

@media screen and (max-width: 650px) {
  @for $i from 1 to 5 {
    .buttons :nth-child(#{$i}).active ~ .indicator {
      transform: translateX(calc(23.6vw * $i));
    }
  }
}
</style>