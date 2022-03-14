<template>
  <div class="va-table-responsive">
    <h1>Recursive Table</h1>
    <table class="va-table va-table--hoverable">
      <tree-node-component v-for="node in treeData" :node="node" :key="node.data['Identification number']" />
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import treeNodeComponent from "./tree.node.component.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainComponent",
  components: {
    treeNodeComponent,
  },
  setup() {
    const store = useStore();
    const treeData = computed(() => store.getters["mainDataModule/data"]);
    return {
      treeData,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.va-table-responsive {
  margin: 30px;
}
</style>
