// import * as types from "./types";
import type { ITableRow } from "./types";
import * as types from "./types";

export function getData({ commit }: any, payload: ITableRow[]) {
    commit(types.GET_DATA, payload)
}

export function removeNode({ commit }: any, payload: ITableRow) {
    commit(types.REMOVE_NODE, payload)
}