<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <div class="columns">
              <div class="column is-7">
                <div class="title">Sequence-to-Sequence Antwort Generierung</div>
                <div
                  class="subtitle"
                >Bei Sequence-to-Sequence Architekturen wird eine Sequenz in eine andere Sequenz beliebiger Länge umgewandelt und wird hauptsächlich für Übersetzung, Spracherkennung oder Question Answering verwendet.</div>
              </div>
            </div>
            <b-field>
              <b-button
                tag="router-link"
                :to="{name:'Seq2SeqUpload'}"
                icon-left="plus-circle"
                type="is-primary"
                inverted
                outlined
              >Neu</b-button>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <b-table :data="seq2seqModels" :loading="isLoading">
              <template slot-scope="props">
                <b-table-column field="modelName" label="Modellname">{{ props.row.seq2SeqName }}</b-table-column>

                <b-table-column field="fileName" label="Dateiname">{{ props.row.fileName }}</b-table-column>
                <b-table-column field="isTrained" label="Trainiert">
                  <b-icon v-if="props.row.train" icon="check-square"></b-icon>
                  <b-icon v-else icon="times"></b-icon>
                </b-table-column>
                <b-table-column field="button" label="Aktionen">
                  <div class="buttons">
                    <b-button
                      tag="router-link"
                      :to="{name:'Seq2SeqDetails',params:{'seq2SeqId':props.row.id}}"
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
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Seq2SeqOverview extends Vue {
  seq2seqModels = [];
  isLoading = false;

  mounted() {
    this.fetchSeq2SeqModels();
  }

  fetchSeq2SeqModels() {
    this.isLoading = true;
    return this.$http
      .get("http://localhost:18080/seq2seq")
      .then(({ data }) => {
        this.seq2seqModels = data;
        this.isLoading = false;
        if (this.seq2seqModels.length == 0) {
          this.$buefy.snackbar.open(
            "Keine Seq2Seq Modelle verfügbar. Bitte zuerst Daten importieren"
          );
        }
      })
      .catch(err => console.log(err));
  }
}
</script>

<style>
</style>