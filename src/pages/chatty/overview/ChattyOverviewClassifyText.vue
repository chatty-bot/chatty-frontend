<template>
  <ChattyOverviewContent :description="description" :buttonText="buttonText" v-on:select="onSelect">
    <template slot="icon">
      <b-icon icon="file-alt" size="is-large" type="is-primary"></b-icon>
    </template>
  </ChattyOverviewContent>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ChattyOverviewContent from "../../../components/ChattyOverviewContent.vue";
@Component({
  components: { ChattyOverviewContent }
})
export default class ChattyOverviewClassifyText extends Vue {
  description =
    "Create a text classifier, which you can train with your own data. Add intents and label data manually. The two training types are currently SVM and CNN";
  buttonText = "Classify text";

  onSelect() {
    this.$router.push({ name: "ClassifiersOverview" });
  }
}
</script>

<style lang="scss" scoped>
</style>