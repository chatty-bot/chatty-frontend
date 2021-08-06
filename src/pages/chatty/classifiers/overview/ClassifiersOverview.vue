<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <div class="columns">
              <div class="column is-7">
                <div class="title">Textklassifikation</div>
                <div
                  class="subtitle"
                >Bei der Textklassifizierung werden Texte anhand von vordefinierten Klassen automatisch zugeordnet. Im Bezug auf Chatbots ist das wichtig um zu erkennen wie der Text weiter bearbeitet werden soll.</div>
              </div>
            </div>

            <b-button
              tag="router-link"
              type="is-primary"
              inverted
              :to="{name:'ClassifiersCreate'}"
              outlined
              icon-left="plus-circle"
            >Neu</b-button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-5">
            <b-table :data="classifiers" :loading="isLoading" detailed>
              <template slot-scope="props">
                <b-table-column
                  field="modelName"
                  label="Modellname"
                  
                >{{ props.row.classifierName }}</b-table-column>

                <b-table-column field="button" label="Aktionen">
                  <div class="buttons">
                    <b-button
                      tag="router-link"
                      :to="{name:'ClassifiersDetailsInformation',params:{'classifierName':props.row.classifierName}}"
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { ClassifierTO } from "../../../../client/chatty/models";
@Component
export default class ClassifiersOverview extends Vue {
  classifiers: ClassifierTO[] = [];
  isLoading = false;

  mounted() {
    //this.classifiers = await xyz
    this.isLoading = true;
    console.log("loading classifier");
    this.$http
      .get("http://localhost:18080/classifier/")
      .then(response => {
        this.classifiers = response.data;
        this.isLoading = false;
      })
      .catch(error => {
        this.isLoading = false;
      });
  }

  displayClassifier(classifierName: string) {
    this.$router.push({
      name: "ClassifiersDetailsInformation",
      params: { classifierName: classifierName }
    });
  }
}
</script>
<style lang="scss">
</style>