import * as types from "./types";
import state, { mainStateData } from "./state";
import { ITableRow, TREE_LEVEL } from "./types";

const mutations = {
    [types.GET_DATA](state: mainStateData, data: ITableRow[]) {
        state.mainData = data;
    },

    [types.REMOVE_NODE](state: mainStateData, data: ITableRow) {
        recursiveRemoval(state.mainData, data, TREE_LEVEL.LEVEL_0)
    }
};

function recursiveRemoval(arr: any, obj: ITableRow, comparator: string) {
    for (let i = 0; i < arr.length; i++) {
        if (obj.data[comparator] == arr[i].data[comparator]) {
            console.log(arr[i]);
            return arr.splice(i, 1)
        }
        if (arr[i].kids.has_relatives?.records) {
            recursiveRemoval(arr[i].kids.has_relatives.records, obj, TREE_LEVEL.LEVEL_1);
        }
        if (arr[i].kids.has_phone?.records) {
            recursiveRemoval(arr[i].kids.has_phone.records, obj, TREE_LEVEL.LEVEL_2)
        }
    }
}

export default mutations;