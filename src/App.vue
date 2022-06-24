<template>
  <v-app>
    <v-app-bar app color="#B0BEC5">
      <h1>Search NPM packages</h1>
    </v-app-bar>
    <v-main class="main">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.main{
  background-color: #ECEFF1;
}
</style>
