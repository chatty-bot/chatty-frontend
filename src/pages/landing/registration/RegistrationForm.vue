<template>
  <div class="columns">
    <div class="column is-4"></div>
    <div class="column has-text-centered">
      <h3 class="title has-text-white">Create account</h3>
      <b-field label="Username" label-position="inside">
        <b-input v-model="user.username" icon="user" placeholder="Username"></b-input>
      </b-field>
      <b-field label="Password" label-position="inside">
        <b-input v-model="user.password" icon="key" type="password" placeholder="Password"></b-input>
      </b-field>
      <b-field label="Email" label-position="inside">
        <b-input v-model="user.email" icon="envelope" placeholder="E-Mail"></b-input>
      </b-field>
      <b-button type="is-primary" size="is-medium" expanded @click="register">Sign up</b-button>
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
      user: { username: "", password: "", email: "" }
    };
  },
  methods: {
    ...mapActions({
      startSession: "CREATE_SESSION"
    }),
    register() {
      this.$http
        .post("http://localhost:18080/register", this.user)
        .then(response => {
          this.$http
            .post("http://localhost:18080/login", {
              username: response.data.username,
              password: response.data.password
            })
            .then(resp => {
              if (resp.status == 200) {
                this.startSession(resp).then(() => {
                 console.info("Starting new session");
                  this.$router.push("/chatty");
                });
              }
            });
        });
    }
  }
});
</script>

<style>
</style>