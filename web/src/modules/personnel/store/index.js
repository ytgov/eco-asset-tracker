import { EMPLOYEE_URL } from "@/urls";
import { getInstance } from "@/auth/auth0-plugin";
import axios from "axios";

const testPersonnel = [
  {
    display_name: "Lise Farynowski",
    first_name: "Lise",
    last_name: "Farynowski",
    ynet_id: "llfaryno",
    email: "Lise.Farynowski@yukon.ca",
    long_name:
      "Lise Farynowski (llfaryno) Economic Development :  Director, Business and Industry Development",
    title: "Director, Business and Industry Development",
    department: "Economic Development",
    officeLocation: "303 Alexander",
    userPrincipalName: "llfaryno@ynet.gov.yk.ca"
  },
  {
    display_name: "Carolyn Relf",
    first_name: "Carolyn",
    last_name: "Relf",
    ynet_id: "crelf",
    email: "Carolyn.Relf@yukon.ca",
    long_name: "Carolyn Relf (crelf) Energy Mines and Resources :  Director",
    title: "Director",
    department: "Energy Mines and Resources",
    officeLocation: "Yukon Geological Survey",
    userPrincipalName: "crelf@ynet.gov.yk.ca"
  },
  {
    display_name: "Benton Foster",
    first_name: "Benton",
    last_name: "Foster",
    ynet_id: "bfoster",
    email: "Benton.Foster@yukon.ca",
    long_name:
      "Benton Foster (bfoster) Health and Social Services :  Director, Community Health Programs",
    title: "Director, Community Health Programs",
    department: "Health and Social Services",
    officeLocation: "Vendome Place",
    userPrincipalName: "bfoster@ynet.gov.yk.ca"
  },
  {
    display_name: "ecc director",
    first_name: "ecc",
    last_name: "director",
    ynet_id: "eccdirector",
    email: "ecc.director@yukon.ca",
    long_name: "ecc director (eccdirector) Community Services",
    title: "Unknown title",
    department: "Community Services",
    officeLocation: null,
    userPrincipalName: "eccdirector@ynet.gov.yk.ca"
  },
  {
    display_name: "Anton Solomon",
    first_name: "Anton",
    last_name: "Solomon",
    ynet_id: "ajsolomo",
    email: "Anton.Solomon@yukon.ca",
    long_name:
      "Anton Solomon (ajsolomo) Economic Development :  Director, Post Secondary and Labour Market",
    title: "Director, Post Secondary and Labour Market",
    department: "Economic Development",
    officeLocation: "303 Alexander",
    userPrincipalName: "ajsolomo@ynet.gov.yk.ca"
  },
  {
    display_name: "Simon Blakesley",
    first_name: "Simon",
    last_name: "Blakesley",
    ynet_id: "sblakesl",
    email: "Simon.Blakesley@yukon.ca",
    long_name:
      "Simon Blakesley (sblakesl) Education :  Director, Student Information & Assessment",
    title: "Director, Student Information & Assessment",
    department: "Education",
    officeLocation: "Education Building",
    userPrincipalName: "sblakesl@ynet.gov.yk.ca"
  }
];

const state = {
  currentEmployee: {},
  employees: []
};

const getters = {};

const actions = {
  async initialize({ dispatch, state }) {
    //load personnel from the database
    //*note* personnel different than users users are managed through the administation module
    await dispatch("getAllEmployees");
    console.log(`Loaded ${state.employees.length} personnel`);
  },

  async getAllEmployees({ commit }) {
    commit("setEmployees", testPersonnel);
  },

  async loadEmployee({ commit }, id) {
    const auth = getInstance();

    return await auth
      .get(`${EMPLOYEE_URL}/${id}`)
      .then(resp => {
        commit("setCurrentEmployee", resp.data.data);
        return resp.data.data;
      })
      .catch(() => {
        commit("setCurrentEmployee", { testPersonnel });
      });
  },
  // async loadEmployeeAuthorities({ commit }, id) {
  //   const auth = getInstance();

  //   return await auth
  //     .get(`${EMPLOYEE_URL}/${id}/authorities`)
  //     .then(resp => {
  //       commit("setEmployeeAuthorities", resp.data.data);
  //       return resp.data.data;
  //     })
  //     .catch(() => {
  //       commit("setEmployeeAuthorities", {});
  //     });
  // },
  async saveEmployee(store) {
    const auth = getInstance();

    let employee = store.getters.employee;

    let body = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      employee_id: employee.employee_id,
      ynet_id: employee.ynet_id,
      email: employee.email,
      primary_department: employee.primary_department
    };

    return await auth
      .put(`${EMPLOYEE_URL}/${employee._id}`, body)
      .then(resp => {
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
    console.log(EMPLOYEE_URL)
    return axios.post(`${EMPLOYEE_URL}/search-directory`, { terms }).then(resp => {
      return resp.data.data;
    });
  }
};

const mutations = {
  setCurrentEmployee(state, payload) {
    state.employee = payload;
  },
  setEmployees(state, payload) {
    state.employees = payload;
  }
  // setEmployeeAuthorities(state, value) {
  //   state.authorities = value;
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
