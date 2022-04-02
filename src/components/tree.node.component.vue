<template>
  <div :style="tableMargins">
    <table>
      <tr v-if="node.title">
        {{
          node.title
        }}
      </tr>
      <tr>
        <th @click="toggleChildren" v-if="hasRecords">
          <i
            :class="[showChildren ? 'fa fa-angle-down' : 'fa fa-angle-right']"
            class="expand-icon"
          ></i>
        </th>
        <th v-for="(value, key) in tableData" :key="value">
          {{ key }}
        </th>
      </tr>
      <tr>
        <td v-if="node.kids"></td>
        <td v-for="value in tableData" :key="value">
          {{ value }}
        </td>
        <td>
          <button @click="removeNode(node)" class="remove-node-btn">X</button>
        </td>
      </tr>
    </table>
    <tree-node-component
      v-show="showChildren"
      v-for="node in normalizeData(node)"
      :node="node"
      :key="globalMixin(node)"
      :spacing="spacing + 10"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import type { ITableRow } from "@/store/modules/main-data-module/types";
import globalMixin from "../mixins/global.mixins";

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

    let randomKey = ref(0);
    let showChildren = ref(false);

    const tableData = computed(() => {
      return node?.data ? node.data : "";
    });

    const toggleChildrenIcon = computed(() => {
      return showChildren.value ? "fa fa-angle-down" : "fa fa-angle-right";
    });

    const title = computed(() => {
      return "";
    });
    const hasRecords = computed(() => {
      return node?.kids ? Object.keys(node.kids).length : false;
    });
    const normalizeData = (arg: any) => {
      const kids = arg.kids;
      let normalizedData: any[] = [];
      if (kids) {
        for (let key in kids) {
          kids[key].records.forEach((element: any) => {
            normalizedData.push({ ...element, title: key });
          });
        }
      }
      return normalizedData;
    };

    const toggleChildren = () => {
      showChildren.value = !showChildren.value;
    };

    const removeNode = (node: ITableRow) => {
      let newObj: any = {};
      node.kids ? (newObj.kids = node.kids) : null,
        node.data ? (newObj.data = node.data) : null,
        store.dispatch("mainDataModule/removeNode", newObj);
    };
    return {
      toggleChildren,
      normalizeData,
      toggleChildrenIcon,
      tableData,
      tableMargins,
      showChildren,
      removeNode,
      title,
      hasRecords,
      randomKey,
      globalMixin,
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
table {
  th,
  td {
    min-width: 150px;
    max-width: 150px;
    text-overflow: ellipsis;
    white-space: pre-wrap;
  }
}
</style>
