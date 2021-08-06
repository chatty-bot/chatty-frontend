<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <div class="columns">
              <div class="column is-7">
                <div class="title">Dialogue State Tracking</div>
                <div
                  class="subtitle"
                >Bei Dialogue State Tracking wird über den Gesprächsverlauf hinweg der Zustand des Gesprächs, insbesondere die Informationen des Benutzers gespeichert.</div>
              </div>
            </div>
            <b-field>
              <b-button
                tag="router-link"
                :to="{name:'DstUpload'}"
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
            <b-table :data="dstModels" :loading="isLoading">
              <template slot-scope="props">
                <b-table-column field="modelName" label="Modellname">{{ props.row.dstName }}</b-table-column>

                <b-table-column field="fileName" label="Dateiname">{{ props.row.fileName }}</b-table-column>
                <b-table-column field="isTrained" label="Trainiert">
                  <b-icon v-if="props.row.train" icon="check-square"></b-icon>
                  <b-icon v-else icon="times"></b-icon>
                </b-table-column>
                <b-table-column field="button" label="Aktionen">
                  <div class="buttons">
                    <b-button
                      tag="router-link"
                      :to="{name:'DstDetails',params:{'dstId':props.row.id}}"
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
import { Vue, Prop, Component } from "vue-property-decorator";
@Component
export default class DstOverview extends Vue {
  dstModels = [];
  isLoading = false;

  mounted() {
    this.fetchDstModels();
  }

  fetchDstModels() {
    this.isLoading = true;
    return this.$http
      .get("http://localhost:18080/dst")
      .then(({ data }) => {
        this.dstModels = data;
        this.isLoading = false;
        if (this.dstModels.length == 0) {
          this.$buefy.snackbar.open(
            "Keine Dst Modelle verfügbar. Bitte zuerst Daten importieren"
          );
        }
      })
      .catch(err => console.log(err));
  }
}
</script>

<style>
</style>