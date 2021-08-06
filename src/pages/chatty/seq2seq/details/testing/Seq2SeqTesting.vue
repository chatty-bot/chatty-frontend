<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="title">Modul testen</div>
        <div class="subtitle">Eingaben in der kompakten DST Form möglich</div>
        <div class="box">
          <div class="columns">
            <div class="column">
              <b-field label="Eingabe">
                <b-input v-model="transcript"></b-input>
              </b-field>
              <b-field>
                <b-button @click="submitTranscript">Senden</b-button>
              </b-field>
            </div>
            <div class="column">
              <p>{{generatedAnswer}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
import { Seq2SeqTO } from "../../../../../client/chatty/models";

@Component
export default class Seq2SeqTesting extends Vue {
  @Prop() seq2SeqModule!: Seq2SeqTO;

  transcript = "";
  generatedAnswer = "";

  submitTranscript() {
    this.$http
      .post(
        "http://localhost:18080/gateway/seq2seq/predict/" +
          this.seq2SeqModule.id,
        {
          transcript: this.transcript
        }
      )
      .then(({ data }) => {
        this.generatedAnswer = data;
      });
  }
}
</script>
