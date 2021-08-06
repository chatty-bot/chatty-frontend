<template>
  <ChattyOverviewContent :description="description" :buttonText="buttonText" v-on:select="onSelect">
    <template slot="icon">
      <b-icon icon="comment-dots" size="is-large" type="is-primary" custom-class="mb-3"></b-icon>
    </template>
  </ChattyOverviewContent>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ChattyOverviewContent from "../../../components/ChattyOverviewContent.vue";
@Component({
  components: { ChattyOverviewContent }
})
export default class ChattyOverviewAnswerSelection extends Vue {
  description =
    "Create a model for answer selection by importing your data. The modules will use the text classifiers that were created before";
  buttonText = "Create Answer Selection";

  onSelect() {
    this.$router.push({ name: "AnswerSelectionOverview" });
  }
}
</script>

<style lang="scss" scoped>
</style>