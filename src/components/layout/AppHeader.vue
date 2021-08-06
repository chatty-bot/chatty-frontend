<template>
  <b-navbar shadow fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="./../../assets/chatbot_logo.png" alt="Chatty NLP Engine" />
      </b-navbar-item>
    </template>
    <template v-if="isLoggedIn" slot="start">
      <b-navbar-item tag="router-link" to="/chatty/classifiers">Text Classification</b-navbar-item>
      <b-navbar-item tag="router-link" to="/chatty/chatbot">Start Chatbot</b-navbar-item>
      <b-navbar-dropdown label="Create Dialog">
        <b-navbar-item tag="router-link" to="/chatty/dialog_woz/user">Patient Dialogue</b-navbar-item>
        <b-navbar-item tag="router-link" to="/chatty/dialog_woz/system">System Dialogue</b-navbar-item>
        <b-navbar-item
          tag="router-link"
          to="/chatty/dialogue_state_tracking"
        >Dialogue State Tracking</b-navbar-item>
      </b-navbar-dropdown>

      <b-navbar-item tag="router-link" to="/chatty/answer_selection">Answer Selection</b-navbar-item>
      <b-navbar-item tag="router-link" to="/chatty/seq2seq">Seq2Seq</b-navbar-item>
    </template>

    <template v-if="!isLoggedIn" slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button tag="router-link" to="/register" type="is-primary">Sign up</b-button>
          <b-button tag="router-link" to="/login" type="is-primary" inverted>Log in</b-button>
        </div>
      </b-navbar-item>
    </template>
    <template v-else slot="end">
      <b-navbar-item tag="div">
        <b-icon icon="user" size="is-small"></b-icon>
        <span>{{userName}}</span>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-button @click="logout">Logout</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class AppHeader extends Vue {
  userName = "";
  get isLoggedIn() {
    return this.$store.getters.isLoggedIn;
  }
  mounted() {
    this.$http.get("http://localhost:18080/user").then(({ data }) => {
      this.userName = data;
    });
  }

  logout() {
    this.$store.dispatch("DESTROY_SESSION").then(() => {
      this.$router.push("/");
    });
  }
}
</script>

<style>
</style>