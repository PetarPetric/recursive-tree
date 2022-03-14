import * as types from "./types";
import state, { mainStateData } from "./state";
import { ITableRow } from "./types";

const mutations = {
    [types.GET_DATA](state: mainStateData, data: ITableRow[]) {
        state.mainData = data;
    },

    [types.REMOVE_NODE](state: mainStateData, data: ITableRow) {
        recursiveRemoval(state.mainData, data)
    }
};

function recursiveRemoval(arr: any, obj: ITableRow) {
    for (let i = 0; i < arr.length; i++) {
        if (JSON.stringify(obj.data) == JSON.stringify(arr[i].data)) {
            return arr.splice(i, 1)
        }
        if (arr[i].kids.has_relatives?.records) {
            recursiveRemoval(arr[i].kids.has_relatives.records, obj);
        }
        if (arr[i].kids.has_phone?.records) {
            recursiveRemoval(arr[i].kids.has_phone.records, obj)
        }
    }
}

export default mutations;