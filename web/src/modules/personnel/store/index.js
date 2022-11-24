import { EMPLOYEE_URL } from "@/urls";
import { getInstance } from "@/auth/auth0-plugin";
import axios from "axios";

const state = {
  currentEmployee: {},
  employees: [],
  employee: {},
};

const getters = {
  getEmployeeDetails: (state) => (ynet_id) => {
    console.log("ynet_id: " + ynet_id);
    return state.employees.find((employee) => employee.ynet_id === ynet_id);
  },
};

const actions = {
  async initialize({ dispatch, state }) {
    //load personnel from the database
    //*note* personnel are different than users.
    //Users are managed through the administation module
    await dispatch("getAllEmployees");
    console.log(`Loaded ${state.employees.length} personnel`);
  },
  async getEmployeeAssets({ commit }, ynet_id) {
    const auth = axios;
    const response = await auth
      .get(`${EMPLOYEE_URL}/${ynet_id}/assets`)
      .then((response) => {
        if (response.status === 200) {
          commit("setEmployeeAssets", response.data);
          return response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return response;
  },
  async getAllEmployees({ commit }) {
    const auth = axios;
    const response = await auth
      .get(EMPLOYEE_URL)
      .then((response) => {
        if (response.status === 200) {
          commit("setEmployees", response.data);
          return response.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
    return response;
  },
  async getAssignedRooms({ state, commit }) {
    const auth = axios;
    await auth
      .get(`${EMPLOYEE_URL}/${state.employee.ynet_id}/rooms`)
      .then((response) => {
        if (response.status === 200) {
          commit("setAssignedRooms", response.data);
          return response.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  },
  async getAssignedKeys({ commit, state }) {
    const auth = axios;
    await auth
      .get(`${EMPLOYEE_URL}/${state.employee.ynet_id}/keys`)
      .then((response) => {
        if (response.status === 200) {
          commit("setAssignedKeys", response.data);
          return response.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  },
  async createEmployee({ dispatch }, employee) {
    const auth = axios;
    //employee.created_by = auth.user.sub;
    employee.created_at = new Date();
    delete employee.long_name;
    delete employee.officeLocation;
    delete employee.userPrincipalName;

    return await auth
      .post(EMPLOYEE_URL, employee)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          // commit("setCurrentEmployee", response.data);
          dispatch("getAllEmployees");
          return response;
        } else {
          console.log("Didn't save...");

          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  },

  async loadEmployee({ commit }, id) {
    // const auth = getInstance();
    const auth = axios;
    return await auth
      .get(`${EMPLOYEE_URL}/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          commit("setCurrentEmployee", resp.data);
          return resp.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
        // const testEmployee = testPersonnel.find((e) => e.ynet_id === id);
        // commit("setCurrentEmployee", testEmployee);
      });
  },
  async saveEmployee(store) {
    const auth = getInstance();

    let employee = store.getters.employee;

    let body = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      employee_id: employee.employee_id,
      ynet_id: employee.ynet_id,
      email: employee.email,
      primary_department: employee.primary_department,
      updated_at: new Date(),
    };

    return await auth
      .put(`${EMPLOYEE_URL}/${employee._id}`, body)
      .then((resp) => {
        //commit("setEmployee", resp.data.data);
        return resp.data.data;
      })
      .catch(() => {
        store.commit("setEmployee", {});
      });
  },
  async searchDirectory(store, { terms }) {
    // const auth = getInstance();

    // return auth.post(`${EMPLOYEE_URL}/search`, { terms }).then(resp => {
    //   return resp.data.data;
    // });
    return axios
      .post(`${EMPLOYEE_URL}/search-directory`, { terms })
      .then((resp) => {
        return resp.data.data;
      });
  },
};

const mutations = {
  setCurrentEmployee(state, payload) {
    state.employee = payload;
  },
  setEmployees(state, payload) {
    state.employees = payload;
  },
  setAssignedRooms(state, payload) {
    state.employee.assignedRooms = payload;
  },
  setEmployeeAssets(state, payload) {
    state.employee.assets = payload;
  },
  setAssignedKeys(state, payload) {
    state.employee.keys = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
