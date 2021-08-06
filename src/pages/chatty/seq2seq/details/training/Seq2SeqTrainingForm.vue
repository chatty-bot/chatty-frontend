<template>
  <div>
    <div class="title is-4">Trainieren des Moduls</div>
    <div
      class="subtitle"
    >Es kann nur die Anzahl der Epochen bestimmt werden mit. Je größer die Anzahl der Epochen desto länger dauert ads Training</div>

    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <b-field label="Epochen">
            <b-field grouped>
              <p class="control">
                <b-icon v-if="seq2SeqModule.train" type="is-primary" size="is-medium" icon="check"></b-icon>
                  <b-icon v-else type="is-primary" size="is-medium" icon="times"></b-icon>
              </p>
              <b-numberinput v-model="epochs"></b-numberinput>
              <b-button type="is-primary" @click="onClickTraining">Start</b-button>
            </b-field>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
import { Seq2SeqTO } from "../../../../../client/chatty/models";

@Component
export default class Seq2SeqTrainingForm extends Vue {
  epochs = 0;

  @Prop() seq2SeqModule!: Seq2SeqTO;
  @Emit("onStartTraining")
  onClickTraining() {
    return this.epochs;
  }
}
</script>

<style>
</style>