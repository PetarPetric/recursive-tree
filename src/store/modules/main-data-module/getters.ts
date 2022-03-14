import type { mainStateData } from "./state";

const getters = {
    data: (state: mainStateData) => {
        return state.mainData;
    },
};
export default getters;