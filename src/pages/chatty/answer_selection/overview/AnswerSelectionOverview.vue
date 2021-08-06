<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <div class="columns">
              <div class="column is-7">
                <h1 class="title">Antwortauswahl</h1>
                <h2
                  class="subtitle"
                >Antwortauswahl beschreibt den Vorgang, wenn aus einem Antwortsatz die bestmöglichste Antwort auf eine Eingabe ausgewählt wird. Die Auswahl geschieht dabei durch ein neuronales Netz</h2>
              </div>
            </div>
            <b-field>
              <b-button
                tag="router-link"
                type="is-primary"
                inverted
                outlined
                :to="{name:'AnswerSelectionCreate'}"
                icon-left="plus-circle"
              >Neu</b-button>
            </b-field>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-7">
            <b-table :data="answerSelectionModules" :loading="isLoading" detailed>
              <template slot-scope="props">
                <b-table-column
                  field="modelName"
                  label="Modellname"
                >{{ props.row.answerSelectionName }}</b-table-column>
                <b-table-column field="classifierName" label="Klassifikator">
                  <router-link
                    :to="{name:'ClassifiersDetailsInformation',params:{'classifierName':classifier.classifierName}}"
                    v-for="(classifier,idx) in props.row.classifiers"
                    :key="idx"
                  >{{classifier.classifierName}}</router-link>
                </b-table-column>

                <b-table-column field="button" label="Aktionen">
                  <div class="buttons">
                    <b-button
                      tag="router-link"
                      :to="{name:'AnswerSelectionDetailsInformation',params:{'answerSelectionName':props.row.answerSelectionName}}"
                      type="is-primary"
                    >Details</b-button>
                    <b-button type="is-warning">Löschen</b-button>
                  </div>
                </b-table-column>
              </template>

              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon icon="frown" size="is-large"></b-icon>
                    </p>
                    <p>Nothing here.</p>
                  </div>
                </section>
              </template>
              <template slot="detail">
                <p>TODO</p>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { AnswerSelectionTO } from "../../../../client/chatty/models/answer-selection-to";
@Component
export default class AnswerSelectionOverview extends Vue {
  answerSelectionModules: AnswerSelectionTO[] = [];
  isLoading = false;
  fetchAllAnswerSelectionModules() {
    this.isLoading = true;
    this.$http.get("http://localhost:18080/answer_selection").then(response => {
      this.answerSelectionModules = response.data;
      this.isLoading = false;
      console.info(
        "Fetching answer selection modules",
        this.answerSelectionModules
      );
    });
  }
  showModuleDetails(name: string) {
    this.$router.push({
      name: "AnswerSelectionDetailsInformation",
      params: {
        answerSelectionName: name
      }
    });
  }

  mounted() {
    this.fetchAllAnswerSelectionModules();
  }
}
</script>

<style scoped>
</style>