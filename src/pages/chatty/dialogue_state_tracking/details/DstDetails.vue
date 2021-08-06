<template>
  <DialogueStateTrackingPage :dstId="dstId"></DialogueStateTrackingPage>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import DialogueStateTrackingPage from "./DialogueStateTrackingPage.vue";
@Component({
  components: { DialogueStateTrackingPage }
})
export default class DstDetails extends Vue {
  @Prop() readonly dstId!: number;
}
</script>

<style>
</style>