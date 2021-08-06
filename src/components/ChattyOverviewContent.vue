<template>
  <div>
    <div class="has-text-centered content-header">
      <slot name="icon"></slot>
    </div>
    <div class="has-text-centered content-body">
      <p>{{description}}</p>
    </div>
    <div class="content-footer">
      <b-field>
        <b-button type="is-primary" expanded @click="select($event)">{{buttonText}}</b-button>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class ChattyOverviewContent extends Vue {
  @Prop() description!: string;
  @Prop() buttonText!: string;

  @Emit("select")
  select(event: any) {
    return event;
  }
}
</script>

<style scoped>
.content-header{
    margin:1rem;
}
.content-body {
  padding: 0.5rem;
}

.content-footer{
    margin-top:1rem
}
</style>