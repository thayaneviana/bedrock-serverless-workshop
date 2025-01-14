<template>
  <div>
    <div id="app">
      <nav v-if="isLoggedIn()" class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color: #0d3781;">
        <router-link to="/" class="navbar-brand">
          <img src="./logo.jpg" style="height: 50px;"/>
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
          <ul class="nav navbar-nav navbar-right mr-4 text-light">
            <li class="nav-item mr-4">
              <router-link to="/">Buscar Licitações</router-link>
            </li>
            <li class="nav-item mr-4">
              <span>|</span>
            </li>
            <li class="nav-item mr-4">
              <router-link to="/buscar-documentos">Buscar Documentos</router-link>
            </li>
            <li class="nav-item mr-4">
              <span>|</span>
            </li>
            <li class="nav-item">
              <router-link to="/logout">Sair</router-link>
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
}

li.nav-item a {
  color: #fff;
}
</style>