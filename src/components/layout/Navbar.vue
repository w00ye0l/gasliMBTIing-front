<template>
  <nav class="navbar__custom is-fixed-bottom">
    <div class="navbar__menu">
      <div class="navbar__item">
        <div class="buttons">
          <router-link to="/" class="btn__custom">
            <font-awesome-icon class="icon is-middle" icon="house" />
            <span>Home</span>
          </router-link>

          <router-link to="/" class="btn__custom">
            <font-awesome-icon class="icon is-middle" icon="book" />
            <p>Info</p>
          </router-link>

          <router-link to="/dashboard/communities" class="btn__custom">
            <font-awesome-icon class="icon is-middle" icon="comments" />
            <p>Commu</p>
          </router-link>
          
          <template v-if="!$store.state.isAuthenticated">
            <router-link to="/log-in" class="btn__custom">
              <font-awesome-icon class="icon is-middle" icon="right-to-bracket" />
              <p>Login</p>
            </router-link>
          </template>
          
          <template v-else>
            <router-link to="/dashboard/my-account" class="btn__custom">
              <font-awesome-icon class="icon is-middle" icon="circle-user" />
              <p>User</p>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
.navbar__custom {
  position: fixed;
  bottom: 0;
  margin: auto;
  max-width: 650px;
  width: 100%;
  height: 100px;
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
  display: flex;
  justify-content: space-evenly;
}
.btn__custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 100px;
  background: #EAE4E9;
  border: 0;
  outline: 0;
  color: rgb(74, 74, 74);
}
.icon {
  transition: 0.5s;
}
.btn__custom:hover .icon {
  transform: translateY(-35px);
}
router-link {
  border: 0;
  outline: none;
}
</style>