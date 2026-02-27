import Vue from "vue";
import Vuex from "vuex";
import { getSession, logout as doLogout } from "../services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: getSession()
  },
  mutations: {
    SET_SESSION(state, session) {
      state.session = session;
    }
  },
  actions: {
    setSession({ commit }, session) {
      commit("SET_SESSION", session);
    },
    logout({ commit }) {
      doLogout();
      commit("SET_SESSION", null);
    }
  },
  getters: {
    isAuthed: (state) => !!state.session?.token,
    user: (state) => state.session?.user || null,
    role: (state) => state.session?.user?.role || null
  }
});