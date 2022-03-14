export interface ITableRow {
    data: Record<string, string>;
    kids: Record<string, ITableRow[]>;
}

export const GET_DATA = "GET_DATA";
export const REMOVE_NODE = "REMOVE_NODE"