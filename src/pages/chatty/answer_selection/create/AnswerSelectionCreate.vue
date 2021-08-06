<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <h1 class="title has-text-white">Neues Antwortauswahl Modul erstellen</h1>
          </div>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <h3 class="subtitle">Identify the answer selection module</h3>
            <p>The name should be unique and should give hints what answers will be provided in this module</p>
            <br />
            <b-field label="Answer Selection Module" label-position="inside">
              <b-input
                v-model="newAnswerSelectionName"
                required
                validation-message="May not be empty"
              ></b-input>
            </b-field>
            <b-button
              class="button is-primary is-pulled-right"
              @click="createAnswerSelectionModule"
            >Create module</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { AnswerSelectionTO } from "../../../../client/chatty/models";

@Component
export default class AnswerSelectionCreate extends Vue {
  newAnswerSelectionName = "";

  private createAnswerSelectionModule() {
    this.$http
      .post("http://localhost:18080/answer_selection", {
        answerSelectionName: this.newAnswerSelectionName
      } as AnswerSelectionTO)
      .then(({ data }) => {
        const newAnswerSelectionModule = data as AnswerSelectionTO;
        this.$router.push({
          name: "AnswerSelectionDetailsInformation",
          params: {
            answerSelectionName: newAnswerSelectionModule.answerSelectionName
          }
        });
        this.$buefy.toast.open({
          message: `Created new answer selection module ${newAnswerSelectionModule.answerSelectionName}`,
          type: "is-success"
        });
      })
      .catch(error => {
        this.$buefy.toast.open({
          message: `Could not create answer selection module`,
          type: "is-error"
        });
      });
  }
}
</script>

<style>
</style>