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

function deepEqual(a: any, b: any) {
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (Object.keys(a).length != Object.keys(b).length) return false;
        for (const key in a) if (!deepEqual(a[key], b[key])) return false;
        return true;
    } else return a === b
}

function recursiveRemoval(arr: any, obj: ITableRow) {
    for (let i = 0; i < arr.length; i++) {
        if (deepEqual(arr[i], obj)) {
            console.log(arr[i])
            return arr.splice(i, 1)
        }
        if (!deepEqual(arr[i], obj)) {
            for (const key in arr[i].kids) {
                if (arr[i]?.kids[key]?.records) {
                    recursiveRemoval(arr[i].kids[key].records, obj)
                }
            }
        }
    }
}

export default mutations;
