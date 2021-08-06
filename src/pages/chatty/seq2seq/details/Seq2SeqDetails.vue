<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <div class="columns">
              <div class="column">
                <div class="title">{{seq2SeqModule.seq2SeqName}}</div>
                <div class="subtitle">Ein Seq2Seq Module zur Generierung von natürlicher Sprache</div>
              </div>
            </div>
          </div>
          <Seq2SeqDetailsNavbar></Seq2SeqDetailsNavbar>
        </div>
      </div>
    </div>
    <router-view :seq2SeqModule="seq2SeqModule" v-on:onModuleUpdated="updateModule"></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Seq2SeqTO } from "../../../../client/chatty/models";
import Seq2SeqDetailsNavbar from "./Seq2SeqDetailsNavbar.vue";
@Component({
  components: { Seq2SeqDetailsNavbar }
})
export default class Seq2SeqDetails extends Vue {
  @Prop() readonly seq2SeqId!: number;
  public seq2SeqModule: Seq2SeqTO = {};
  mounted() {
    this._fetchSeq2SeqModuleById();
  }

  updateModule(module: Seq2SeqTO) {
    this.seq2SeqModule = module;
  }
  private _fetchSeq2SeqModuleById() {
    this.$http
      .get("http://localhost:18080/seq2seq/" + this.seq2SeqId)
      .then(({ data }) => {
        console.log(data);
        this.seq2SeqModule = data;
      });
  }
}
</script>

<style>
</style>