<template>
  <div class="columns">
    <div class="column is-4"></div>
    <div class="column has-text-centered">
      <h3 class="title has-text-white">Sign in</h3>
      <b-field label="Username" label-position="inside">
        <b-input v-model="user.username" icon="user" placeholder="Username"></b-input>
      </b-field>
      <b-field label="Password" label-position="inside">
        <b-input v-model="user.password" icon="key" type="password" placeholder="Password"></b-input>
      </b-field>
      <b-button type="is-primary" size="is-medium" expanded @click="login">Login</b-button>
    </div>
    <div class="column is-4"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  data() {
    return {
      user: { username: "", password: "" }
    };
  },
  methods: {
    ...mapActions({
      startSession: "CREATE_SESSION"
    }),
    login() {
      this.$http
        .post("http://localhost:18080/login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(resp => {
          if (resp.status == 200) {
            this.startSession(resp).then(() => {
              console.info("Starting new session");
              this.$router.push("/chatty");
            });
          }
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: `Login failed`,
            position: "is-bottom",
            type: "is-danger"
          });
        });
    }
  }
});
</script>

<style>
</style>