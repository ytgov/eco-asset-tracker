import { ROOMS_URL } from "@/urls";
import axios from "axios";
// import store from  "@/store";

const state = {
  rooms: [],
  currentRoom: {}
};

const actions = {
  async initialize({ state, dispatch }) {
    await dispatch("getAllRooms");
    console.log(`Loaded ${state.rooms.length} rooms`);
  },
  async getAllRooms({ commit }) {
    await axios.get(ROOMS_URL).then(response => {
      commit("SET_ROOM_LIST", response.data);
    });
  },
  getRoom({ commit }, roomID) {
    axios.get(`${ROOMS_URL}/${roomID}`).then(response => {
      if (response.status === 200) {
        commit("SET_ROOM", response.data);
      } else {
        console.log(`Error retrieving ${roomID}.  Error: ${response.status}`);
        commit("SET_ROOM", {});
      }
    });
  },
  async saveRoom({ commit, state, dispatch }) {
    console.log(`Saving room with id: ${state.currentRoom._id}`);
    axios
      .put(`${ROOMS_URL}/${state.currentRoom._id}`, state.currentRoom)
      .then(response => {
        if (response.status === 200) {
          commit("SET_ROOM", state.currentRoom);
          dispatch("getAllRooms");
        } else {
          console.log("Error saving room: " + response.status);
          commit("SET_ROOM", {});
        }
      });
  },
  async createRoom({ commit, dispatch }, room) {
    let randomID = Math.floor(Math.random() * 10000);
    room._id = randomID;
    await axios.post(`${ROOMS_URL}`, room).then(response => {
      if (response.status === 200) {
        dispatch("getAllRooms");
        commit("SET_ROOM", room);
        return "Room created";
      }
      // else {
      return "Error creating ";
      //  }
    });
  },
  deleteRoom({ commit, dispatch }, roomID) {
    axios.delete(`${ROOMS_URL}/${roomID}`).then(response => {
      if (response.status === 200) {
        dispatch("getAllRooms");
        commit("SET_ROOM", {});
        return response.status;
      } else {
        console.log("Error deleting room: " + roomID);
        commit("SET_ROOM", {});
      }
    });
  },
  clearRoom({ commit }) {
    commit("SET_ROOM", {});
  },
  async getRoomPurposes() {
    return axios
      .get(`${ROOMS_URL}/purposes`)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else throw new Error(response.statusText);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getRoomStatuses() {
    return axios
      .get(`${ROOMS_URL}/statuses`)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else throw new Error(response.statusText);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  SET_ROOM_LIST(state, payload) {
    state.rooms = payload;
  },
  SET_ROOM(state, payload) {
    state.currentRoom = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};