<template>
  <div>
    <!-- for the sake of structure one more component that might not be needed -->
    <main-component></main-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import MainComponent from "./components/main.component.vue";
import dataTree from "@/json/example-data.json";

export default defineComponent({
  name: "App",
  components: {
    MainComponent,
  },
  setup() {
    const store = useStore();
    store.dispatch("mainDataModule/getData", dataTree);
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
