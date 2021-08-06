<template>
  <div class="columns">
    <div class="column">
      <div class="box">
        <p class="title is-spaced">Upload a dataset</p>
        <p class="subtitle">
          Your dataset has to be in a certain format. For now only
          <b-tooltip
            label="csv File format is a format where each value is separated by a comma"
            position="is-top"
          >
            <b-tag class="is-dark">.csv</b-tag>
          </b-tooltip>

          <span></span>
          is enabled with the headers
          <b-tag class="is-dark">response</b-tag>
          <span></span> ,
          <b-tag class="is-dark">text</b-tag>
          <span></span> and
          <b-tag class="is-dark">task</b-tag>
          <span></span> so your file should contain the relevant information
          in these two headers.
          <b-tag class="is-dark">task</b-tag>is required because after training
          the correct answer will be selected from a pool of answers after identifying the task. It may contain other headers, but only these two will be used for training.
        </p>
        <br />
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop :loading="loading">
            <section class="section">
              <div class="content has-text-centered ">
                <p>
                  <b-icon icon="upload" size="is-large" type="is-dark"></b-icon>
                </p>
                <p class="has-text-dark">Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
            {{file.name}}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile(index)"
            ></button>
          </span>
        </div>
        <b-field>
          <b-button class="is-primary" size="is-medium" @click="uploadFiles">Upload</b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class AnswerSelectionDetailsUpload extends Vue {
  dropFiles = [];
  loading = false;

  async uploadFiles() {
    /**
     * First Part is creating the classifier
     */
    try {
      this.loading = true;
      let multiPartFormData = new FormData();
      multiPartFormData.append("file", this.dropFiles[0]);
      await this.$http.post(
        "http://localhost:18080/upload/answer_selection/" +
          this.$route.params.answerSelectionName,
        multiPartFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      this.loading = false;
      this.$buefy.toast.open({
        message: "File successfully uploaded",
        type: "is-success"
      });
      this.dropFiles = [];
    } catch (err) {
      return;
    }
  }

  deleteDropFile(index: number) {
    this.dropFiles.splice(index, 1);
  }
}
</script>

<style>
</style>