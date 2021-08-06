<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="section">
          <div class="container">
            <div class="columns">
              <div class="column">
                <div class="title">Dialogue State Tracking</div>
                <div
                  class="subtitle"
                >In dialogue State Tracking the goal is to track the users goal as the dialogue progresses</div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <!-- FIXME: use vue transition instead of fade down on scroll -->
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <div class="box">
              <p class="title is-4 has-text-dark">Start Dialogue State Tracking Training</p>
              <p class="subtitle is-6 has-text-dark">Choose the number of epochs</p>

              <b-field>
                <b-numberinput v-model="epochs"></b-numberinput>
              </b-field>
              <b-field>
                <b-button expanded type="is-primary" @click="trainDST">Start Training</b-button>
              </b-field>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <p class="title is-4 has-text-dark">Start a new Dialogue and check its state</p>
              <p class="subtitle is-6 has-text-dark">Live display the current state as estimated</p>

              <div class="columns">
                <div class="column">
                  <div
                    class="box has-background-grey-lighter has-text-darker"
                    :style="{'textAlign':((text.issuer==='User')? 'right':'left')}"
                    v-for="(text,idx) in chats"
                    :key="idx"
                  >{{text}}</div>
                  <b-field>
                    <b-input v-model="transcript" required></b-input>
                  </b-field>
                  <div class="buttons">
                    <b-button type="is-primary" @click="predictDST">Send</b-button>
                    <b-button @click="clearHistory">Clear</b-button>
                  </div>
                </div>
                <div class="column">
                  <DialogueStatePredictions :predictions="beliefState"></DialogueStatePredictions>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DialogueStatePredictions from "./DialogueStatePredictions.vue";

@Component({
  components: { DialogueStatePredictions }
})
export default class DialogueStateTrackingPage extends Vue {
  @Prop() readonly dstId!: number;
  chats = [];
  epochs = 0;
  systemActs = [];
  transcript = "";
  predictions = [];
  state = [];
  beliefState = {};

  trainDST() {
    // TODO we are missing parameters to identify the correct dst models
    this.$http.get("http://localhost:18080/gateway/dst/train/" + this.dstId, {
      params: {
        epochs: this.epochs
      }
    });
  }

  predictDST() {
    this.$http
      .post("http://localhost:18080/gateway/dst/predict/" + this.dstId, {
        systemActs: this.systemActs,
        transcript: this.transcript,
        beliefState: this.beliefState
      })
      .then(({ data }) => {
        this.chats.push(this.transcript);
        this.beliefState = data;
      });
  }

  clearHistory() {
    this.chats = [];
    this.beliefState = {};
  }
}
</script>


