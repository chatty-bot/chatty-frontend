<template>
  <div>
    <div class="section">
      <div class="container">
        <p class="title">Symptom Information Task aus Sicht des Systems</p>
        <p class="content">
          Aus der Sicht des System ist die Aufgabe etwas anders. Dir wird
          die bisherige Verlauf des Gesprächs angezeigt und du musst einige Metainformationen bereitstellen.
          Dazu zählen zum Beispiel "Über welche krankheit will der Patient informiert werden", "Hat der Patient ein Symptom benannt?","Wie typisch ist das benannte Symptom im Bezug auf die Krankheit?".
          Es kann aber auch sein, dass der Patient die Information schon erhalten hat und will nun das Gespräch beenden,
          z.B durch "Vielen Dank" oder "Danke".
        </p>
      </div>
    </div>

    <div class="container" v-if="currentDialogue">
     
        <p class="title">Historie des Gesprächs</p>
        <p v-for="(dialog,index) in currentDialogue.dialogData" :key="index">
          System: {{dialog.systemTranscript}}
          <br />
          User: {{dialog.transcript}}
        </p>
        <br />

        <b-message>
          <div class="columns">
            <div class="column">
              <b-field label="Auf welche Krankheit bezieht sich der Patient ?">
                <b-select expanded v-model="informType.value" placeholder="Krankheit auswählen">
                  <option
                    :value="illness.illnessName"
                    v-for="(illness,index) in illnesses"
                    :key="index"
                  >{{illness.illnessName}}</option>

                  <option value>Keine Aussage</option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Wie häufig sollen die Symptome bei der Krankheit auftreten?">
                <b-select expanded v-model="informFrequency.value" placeholder="Symptome">
                  <option :value="freq" v-for="(freq,idx) in frequencies" :key="idx">{{freq}}</option>
                  <option value>Keine Aussage</option>
                </b-select>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Auf welches Symptom bezieht sich der Patient ?">
                <b-select expanded v-model="informSymptom.value" placeholder="Symptome">
                  <option
                    :value="symptom.symptomName"
                    v-for="(symptom,index) in symptoms"
                    :key="index"
                  >{{symptom.symptomName}}</option>

                  <option value>Keine Aussage</option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Will der Patient über ein bestimmtes Symptom informiert werden?">
                <b-select expanded v-model="isRequested" placeholder="Symptome">
                  <option :value="true">Ja</option>
                  <option :value="false">Nein</option>
                  <option :value="false">Nicht sicher</option>
                </b-select>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-field label="Wie ist der mentale Gesundheitszustand des Patienten einzuschätzen ?">
                <b-select expanded v-model="informEscalation.value" placeholder="Eskalation">
                  <option value="ja">Eskalativ</option>
                  <option value="nein">Nicht Eskalativ</option>
                  <option value="vielleicht">Vielleicht</option>
                  <option value>Keine Aussage</option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Ist das Gespräch zu Ende?">
                <b-checkbox v-model="dialogueFinished" placeholder="Symptome"></b-checkbox>
              </b-field>
            </div>
          </div>
        </b-message>
     
    </div>
    <div class="section" v-if="currentDialogue">
      <div class="container">
        <b-field
          label="Deine Antwort auf die letzte Eingabe des Patienten"
          label-position="on-border"
        >
          <b-input expanded placeholder="Deine Antwort" v-model="systemInput"></b-input>
          <p class="control">
            <b-button class="button is-primary" @click="addSystemResponse">Absenden</b-button>
          </p>
        </b-field>
      </div>
      <div class="section">
        <p class="title">Symptome die zur Auswahl stehen</p>
        <p class="subtitle">(und natürlich umschrieben werden können)</p>

        <br />
        <b-table :data="symptoms" :columns="columns"></b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {
  DialogueTO,
  StateTO,
  SlotTO,
  DialogueDataTO,
  Issuer,
  DialogueUpdateTO,
  SymptomTO
} from "../../client/chatty/models";

@Component
export default class AddSystemResponse extends Vue {
  columns = [
    { field: "illnessName", label: "Krankheit" },
    { field: "symptomName", label: "Symptom" },
    { field: "symptomFrequency", label: "Häufigkeit" }
  ];
  systemInput = "";
  symptoms: SymptomTO[] = [];
  illnesses: IllnessTO[] = [];

  currentDialogue: DialogueTO = null;
  state = {} as StateTO;
  requestSymptom = { label: "request", value: "symptom" } as SlotTO;
  isRequested = false;
  informSymptom = { label: "symptom", value: "" } as SlotTO;
  informType = { label: "type", value: "" } as SlotTO;
  informFrequency = { label: "frequency", value: "" } as SlotTO;
  informEscalation = { label: "escalation", value: "" } as SlotTO;
  dialogueFinished: boolean = false;

  get frequencies() {
    return new Set(this.symptoms.map(it => it.symptomFrequency));
  }

  mounted() {
    this.$http
      .get("http://localhost:18080/dialogue/system")
      .then(({ data }) => {
        this.currentDialogue = data;
        console.info("Currently processing dialogue ", data);
      })
      .catch(error => {
        // nothing to do here
        this.$buefy.snackbar.open(
          "Es existiert gerade kein Dialog, den du bearbeiten kannst"
        );
      });
    this.$http
      .get("http://localhost:18080/symptoms")
      .then(({ data }) => {
        this.symptoms = data;
      })
      .catch(err => {
        // do nothing herm
      });

    this.$http
      .get("http://localhost:18080/illnesses")
      .then(({ data }) => {
        this.illnesses = data;
      })
      .catch(err => {
        // do nothing herm
      });

    // TODO select a dialog that has not yet finished and requires a system response
  }

  addSystemResponse() {
    let state = this._createState();
    let dialogData = this._createNewDialogueData(state);
    let update = this._createUpdateRequest(dialogData);

    this.$http
      .post("http://localhost:18080/dialogue/add", {
        dialogueUpdateTO: update
      })
      .then(resp => {
        this.$buefy.toast.open({
          message: "System Antwort erfolgreich gespeichert",
          type: "is-success"
        });
        this.systemInput = "";
        window.location.reload();
      });
    //
  }
  _createUpdateRequest(dialogData: DialogueDataTO) {
    let update = {
      dialogId: this.currentDialogue.id,
      dialogueDataTO: dialogData,
      requiresActionFrom: Issuer.USER,
      finished: this.dialogueFinished
    } as DialogueUpdateTO;
    return update;
  }
  _createNewDialogueData(state: StateTO) {
    let dialogData = {
      turn: this._createNewTurn(),
      systemTranscript: this.systemInput,
      transcript: "",
      issuer: Issuer.SYSTEM,
      stateTO: state
    } as DialogueDataTO;
    return dialogData;
  }
  _createNewTurn(): number {
    return (
      this.currentDialogue.dialogData[
        this.currentDialogue.dialogData.length - 1
      ].turn + 1
    );
  }

  private _createState() {
    let state = {
      dialogDataId: this.currentDialogue.id,
      slots: []
    } as StateTO;
    if (this.isRequested) {
      state.slots.push(this.requestSymptom);
    }
    if (this.informType.value) {
      state.slots.push(this.informType);
    }
    if (this.informEscalation.value) {
      state.slots.push(this.informEscalation);
    }
    if (this.informSymptom.value) {
      state.slots.push(this.informSymptom);
    }
    if (this.informFrequency.value) {
      state.slots.push(this.informFrequency);
    }
    return state;
  }
}
</script>

<style>
</style>