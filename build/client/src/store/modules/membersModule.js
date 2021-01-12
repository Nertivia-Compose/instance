import Vue from "vue";

const state = {
  members: {},
  presences: {},
  customStatusArr: {},
  programActivity: {}
};

const getters = {
  members(state) {
    return state.members;
  },
  presences(state) {
    return state.presences;
  },
  customStatusArr(state) {
    return state.customStatusArr;
  },
  programActivity(state) {
    return state.programActivity;
  }
};

const actions = {
  updateProgramActivity(context, { uniqueID, name, status }) {
    context.commit("UPDATE_PRGORAM_ACTIVITY", { uniqueID, name, status });
  },
  addProgramActivity(context, programActivityObj) {
    context.commit("ADD_PROGRAM_ACTIVITY", programActivityObj);
  },
  updateCustomStatus(context, { uniqueID, custom_status }) {
    context.commit("UPDATE_CUSTOM_STATUS", { uniqueID, custom_status });
  },
  addCustomStatusArr(context, customStatusArr) {
    context.commit("ADD_CUSTOM_STATUS_ARR", customStatusArr);
  },
  addPresences(context, presences) {
    context.commit("ADD_PRESENCES", presences);
  },
  updatePresence(context, { uniqueID, status }) {
    context.commit("UPDATE_PRESENCE", { uniqueID, status });
  },
  addMembers(context, membersOBJ) {
    context.commit("ADD_MEMBERS", membersOBJ);
  },
  addMember(context, member) {
    context.commit("ADD_MEMBER", member);
  },
  removeMember(context, uniqueID) {
    context.commit("REMOVE_MEMBER", uniqueID);
  },
  updateAvatar(context, { uniqueID, avatarID }) {
    context.commit("UPDATE_AVATAR", { uniqueID, avatarID });
  },
  updateMember(context, data) {
    context.commit("UPDATE_MEMBER", data);
  }
};

const mutations = {
  ADD_PROGRAM_ACTIVITY(state, programActivityObj) {
    state.programActivity = { ...state.programActivity, ...programActivityObj };
  },
  ADD_CUSTOM_STATUS_ARR(state, customStatusArr) {
    state.customStatusArr = { ...state.customStatusArr, ...customStatusArr };
  },
  UPDATE_PRGORAM_ACTIVITY(state, { uniqueID, name, status }) {
    if (!uniqueID || !name) {
      Vue.delete(state.programActivity, uniqueID);
    } else {
      Vue.set(state.programActivity, uniqueID, { name, status });
    }
  },
  UPDATE_CUSTOM_STATUS(state, { uniqueID, custom_status }) {
    Vue.set(state.customStatusArr, uniqueID, custom_status);
  },
  ADD_PRESENCES(state, presences) {
    state.presences = { ...state.presences, ...presences };
  },
  UPDATE_PRESENCE(state, { uniqueID, status }) {
    Vue.set(state.presences, uniqueID, status);
  },
  ADD_MEMBERS(state, membersOBJ) {
    state.members = Object.assign(state.members, membersOBJ);
  },
  ADD_MEMBER(state, member) {
    state.members[member.uniqueID] = member;
  },
  REMOVE_MEMBER(state, uniqueID) {
    delete state.members[uniqueID];
  },
  UPDATE_AVATAR(state, { uniqueID, avatarID }) {
    state.members[uniqueID].avatar = avatarID;
  },
  UPDATE_MEMBER(state, data) {
    const newMembers = state.members;
    newMembers[data.uniqueID] = { ...newMembers[data.uniqueID], ...data };
    state.members = Object.assign({}, newMembers);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
