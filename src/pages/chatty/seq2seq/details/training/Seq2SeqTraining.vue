<template>
  <div class="section">
    <div class="container">
      <Seq2SeqTrainingForm
        :seq2SeqModule="seq2SeqModule"
        v-on:onStartTraining="startSeq2SeqTraining"
      ></Seq2SeqTrainingForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
import Seq2SeqTrainingForm from "./Seq2SeqTrainingForm.vue";
import { Seq2SeqTO } from "../../../../../client/chatty/models";
@Component({
  components: { Seq2SeqTrainingForm }
})
export default class Seq2SeqTraining extends Vue {
  @Prop() seq2SeqModule!: Seq2SeqTO;

  @Emit("onModuleUpdated")
  onModuleUpdated(module: Seq2SeqTO) {
    return module;
  }

  startSeq2SeqTraining(epochs: number) {
    this.$http
      .get(
        "http://localhost:18080/gateway/seq2seq/train/" + this.seq2SeqModule.id,
        {
          params: {
            epochs: epochs,
            seq2SeqName: this.seq2SeqModule.seq2SeqName
          }
        }
      )
      .then(({ data }) => {
        this.onModuleUpdated(data);
      });
  }
}
</script>

<style>
</style>