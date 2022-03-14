export interface ITableRow {
    data: Record<string, string>;
    kids: Record<string, ITableRow[]>;
}

export const GET_DATA = "GET_DATA";
export const REMOVE_NODE = "REMOVE_NODE"
export const TREE_LEVEL = {
    LEVEL_0: "Identification number",
    LEVEL_1: "Relative ID",
    LEVEL_2: "Phone ID"
}