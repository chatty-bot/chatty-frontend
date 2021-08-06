<template>
  <div>
    <div class="section">
      <div class="container">
        <p class="title">Symptom Information Task aus Sicht des Patienten</p>
        <p class="content">
          Hallo! In dieser Aufgabe sollst du nach Möglichkeiten suchen wie man am besten nach den Symptomen einer Depression fragt.
          Das kann Allgemein sein wie "Was sind Symptome einer Depression", oder "Was sind die häufigsten Symptome einer Depression?"
          Aber es kann auch nach einem bestimmten Symptom gefragt werden und wie häufig dieses bei einer Depression auftritt, z.B. "Ist Lustlosigkeit ein Anzeichen von Depressionen?"
        </p>
      </div>
      <div class="section" v-if="currentDialogue">
        <div class="container">
        <p class="title">Historie des Gesprächs</p>
        <p v-for="(dialog,index) in currentDialogue.dialogData" :key="index">
          System: {{dialog.systemTranscript}}
          <br />
          User: {{dialog.transcript}}
        </p>

        <br />
      </div>
      </div>
    </div>
    <div class="container">
      
        <div class="columns">
          <div class="column is-6">
            <b-field>
              <b-input expanded placeholder="Deine Antwort" v-model="userInput"></b-input>
              <p class="control">
                <b-button class="button is-primary" @click="addUtterance">Senden</b-button>
              </p>
            </b-field>
          </div>
        </div>
    
    </div>
    <div class="section">
      <div class="container">
        <p class="title">Symptome die zur Auswahl stehen</p>
        <p class="subtitle">(und natürlich umschrieben werden können)</p>
        <br />
        <b-table :data="symptoms" :columns="columns"></b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  DialogueTO,
  DialogueDataTO,
  Issuer,
  DialogueUpdateTO,
  SymptomTO,
  IllnessTO
} from "../../client/chatty/models";

@Component
export default class AddUserRespone extends Vue {
  columns = [
    { field: "illnessName", label: "Krankheit" },
    { field: "symptomName", label: "Symptom" },
    { field: "symptomFrequency", label: "Häufigkeit" }
  ];

  userInput = "";
  symptoms: SymptomTO[] = [];

  currentDialogue: DialogueTO | null = null;

  mounted() {
    this.$http
      .get("http://localhost:18080/dialogue/user")
      .then(({ data }) => {
        this.currentDialogue = data;
        console.info("Currently processing dialogue ", data);
      })
      .catch(err => {
        // nothing to do here
        this.$buefy.snackbar.open(
          "Es existiert bisher kein Dialog, den du bearbeiten kannst. Fange ein neues Gespräch an"
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
  }

  addUtterance() {
    if (this.currentDialogue) {
      this._updateDialogue();
      return;
    }
    this._createNewDialog();
  }
  _createNewDialog() {
    // here we are starting a new dialog
    const dialog = {
      isFinished: false,
      requiresActionFrom: Issuer.SYSTEM,
      dialogData: [
        {
          systemTranscript: "",
          transcript: this.userInput,
          turn: 0,
          issuer: Issuer.USER
        } as DialogueDataTO
      ]
    } as DialogueTO;

    this.$http
      .post("http://localhost:18080/dialogue", { dialogueTO: dialog })
      .then(resp => {
        this.$buefy.toast.open({
          message: "Patienten Antwort erfolgreich gespeichert",
          type: "is-success"
        });
        this.userInput = "";
      });
  }
  _updateDialogue() {
    // Take current dialogue and update some properties
    let update = this._createUpdateRequest();
    this.$http.post("http://localhost:18080/dialogue/update", {
      dialogueUpdateTO: update
    });
  }
  _createUpdateRequest() {
    let dialogData = this.currentDialogue.dialogData[
      this.currentDialogue.dialogData.length - 1
    ];
    dialogData.transcript = this.userInput;
    let update = {
      dialogId: this.currentDialogue.id,
      requiresActionFrom: Issuer.SYSTEM,
      dialogueDataTO: dialogData
    } as DialogueUpdateTO;
    return update;
  }
}
</script>

<style>
</style>