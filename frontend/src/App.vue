<template>
  <div>
    <div id="app">
      <nav v-if="isLoggedIn()" class="navbar navbar-expand-md navbar-light fixed-top" style="background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <router-link to="/" class="navbar-brand">
          <img src="./logo.png" style="height: 50px;"/>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item"></li>
          </ul>
          <ul class="nav navbar-nav navbar-right mr-4">
            <li class="nav-item mr-4">
              <router-link to="/" style="color: #A01B1B;">Buscar Base de Dados</router-link>
            </li>
            <li class="nav-item mr-4">
              <span style="color: #A01B1B;">|</span>
            </li>
            <li class="nav-item mr-4">
              <router-link to="/buscar-documentos" style="color: #A01B1B;">Buscar Documentos</router-link>
            </li>
            <li class="nav-item mr-4">
              <span style="color: #A01B1B;">|</span>
            </li>
            <li class="nav-item">
              <router-link to="/logout" style="color: #A01B1B;">Sair</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import { getUsername, isLoggedIn } from "./utils/auth";

export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    isLoggedIn() {
      let authenticated = isLoggedIn();

      if (authenticated) {
        this.username = getUsername();
      }

      return authenticated;
    },
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-top: 4rem;
  min-height: 100vh;
}

body.login-background {
  padding-top: 0;
}

li.nav-item a {
  text-decoration: none;
  transition: color 0.3s ease;
}

li.nav-item a:hover {
  color: #7A1515 !important;
}
</style>