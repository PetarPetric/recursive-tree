import { createStore, createLogger } from "vuex";
import mainDataModule from "../store/modules/main-data-module/index";

export const store = createStore({
  modules: {
    mainDataModule
  },
  plugins: [createLogger()]
})
