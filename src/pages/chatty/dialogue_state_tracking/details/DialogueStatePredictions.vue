<template>
  <div>
    <ul>
      <li v-for="(pred,idx) in predictions" :key="idx"><pre>{{pred}}</pre></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class DialogueStatePredictions extends Vue {
  @Prop() predictions!: string[];
}
</script>

<style>
</style>