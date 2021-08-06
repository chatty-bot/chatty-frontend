<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <ValidationObserver ref="observer">
            <ValidationProvider name="dstName" :rules="{required:true}" v-slot="v">
              <b-field label="Name" :type="{ 'is-danger': v.errors[0], 'is-success': v.valid }">
                <b-input v-model="dstName"></b-input>
              </b-field>
              <p class="control has-text-danger">{{v.errors[0]}}</p>
            </ValidationProvider>
          </ValidationObserver>
        </div>
      </div>
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
              <b-tag class="is-dark">label</b-tag>
              <span></span> and
              <b-tag class="is-dark">text</b-tag>
              <span></span> so your file should container the relevant information
              in these two headers. It may contain other headers, but only these two will be used for training.
            </p>
            <br />
            <b-field>
              <b-upload v-model="dropFiles" multiple drag-drop :loading="loading">
                <section class="section">
                  <div class="content has-text-centered">
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
              <b-button class="is-primary" size="is-medium" @click="next">Upload</b-button>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure
} from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "Muss ausgefüllt sein"
});

@Component({
  components: { ValidationProvider, ValidationObserver }
})
export default class DstUpload extends Vue {
  dropFiles = [];
  loading = false;
  dstName = "";

  async next() {
    const valid = await this.$refs.observer.validate();
    if (!valid) return;
    if (!this.dstName) {
      return;
    }
    /**
     * First Part is creating the classifier
     */
    try {
      this.loading = false;
      let multiPartFormData = new FormData();
      multiPartFormData.append("file", this.dropFiles[0]);

      const dstResponse = await this.$http.post(
        "http://localhost:18080/gateway/dst/upload/" + this.dstName,
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
      this.$router.push({
        name: "DstDetails",
        params: { dstId: dstResponse.data.id }
      });
    } catch (err) {
      return;
    }
  }

  deleteDropFile(index: number) {
    this.dropFiles.splice(index, 1);
  }
}
</script>

<style scoped>
.upload {
  width: 100%;
}
.upload-draggable {
  width: 100%;
}
</style>