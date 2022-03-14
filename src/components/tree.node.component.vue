<template>
  <div :style="tableMargins">
    <thead>
      <div v-if="areThereRecords">
        <span @click="toggleChildren" v-if="!showChildren" class="expand-icon">
          <i class="fa fa-angle-right"></i>
        </span>
        <span
          @click="toggleChildren"
          v-else-if="showChildren"
          class="expand-icon"
        >
          <i class="fa fa-angle-down"></i>
        </span>
      </div>

      <tr>
        <th v-for="(value, key) in nodes" :key="value">
          <span>{{ key }}</span>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="value in nodes" :key="value">
          <span>{{ value }}</span>
        </td>
        <td>
          <button @click="removeNode(node)" class="remove-node-btn">X</button>
        </td>
      </tr>
      <div v-show="showChildren">
        <tr>
          <p v-if="areThereRecords">{{ hasChildren }}</p>
        </tr>
        <!-- I hope these IDs are always unique since proper vue rendering depends on them -->
        <tree-node-component
          v-for="node in extractChildrenData(node.kids)"
          :node="node"
          :key="
            node.data['Relative ID']
              ? node.data['Relative ID']
              : node.data['Phone ID']
          "
          :spacing="spacing + 10"
        />
      </div>
    </tbody>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import type { ITableRow } from "@/store/modules/main-data-module/types";

export default defineComponent({
  name: "TreeNodeComponent",
  props: {
    node: {
      type: Object,
      required: true,
    },
    spacing: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  setup(props) {
    var store = useStore();

    const node = reactive(props.node);
    const tableMargins = computed(() => {
      return {
        "margin-left": `${props.spacing * 2}px`,
        position: "relative",
      };
    });

    let showChildren = ref(false);
    const nodes = computed(() => {
      return node?.data ? node.data : "";
    });
    const hasChildren = computed(() => {
      return Object.keys(node.kids)[0];
    });
    const toggleChildrenIcon = computed(() => {
      return showChildren.value ? "fas fa-angle-down" : "fas fa-angle-right";
    });
    const extractChildrenData = (arg: any) => {
      const nodes = arg[`${Object.keys(arg)[0]}`];
      if (nodes) {
        return nodes.records;
      }
    };
    const areThereRecords = computed(() => {
      return node?.kids[`${hasChildren.value}`]?.records.length;
    });
    const toggleChildren = () => {
      showChildren.value = !showChildren.value;
    };
    const removeNode = (node: ITableRow) => {
      store.dispatch("mainDataModule/removeNode", node);
    };
    return {
      toggleChildren,
      extractChildrenData,
      toggleChildrenIcon,
      hasChildren,
      nodes,
      tableMargins,
      showChildren,
      removeNode,
      areThereRecords,
    };
  },
});
</script>

<style scoped lang="scss">
.remove-node-btn {
  cursor: pointer;
  color: white;
  background: red;
  border-radius: 10px;
  padding: 4px;
  width: 28px;
  font-size: 12px;
}
.expand-icon {
  position: absolute;
  top: 25px;
  left: -20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
}
</style>
