<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      width="800">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          size="small"
          v-bind="props"
          @click="doShow"
          >Add</v-btn
        >
      </template>

      <v-app-bar color="#0097A9">
        <v-toolbar-title> Add User </v-toolbar-title>
        <v-spacer />
        <v-icon
          title="Close"
          @click="show = false"
          >mdi-close</v-icon
        >
      </v-app-bar>
      <v-card rounded="0">
        <v-card-text class="mt-5 pb-0">
          <employee-lookup
            actionName="Select"
            label="Employee : "
            :select="pickEmployee"
            v-if="!selectedEmployee.email"></employee-lookup>

          <v-text-field
            v-model="selectedEmployee.display_name"
            readonly
            density="compact"
            variant="outlined"
            label="Employee"
            append-icon="mdi-lock"
            v-if="selectedEmployee.email"
            @click:append="unselectEmployee"></v-text-field>
          <div v-if="selectedEmployee.email">
            <v-text-field
              label="Employee title"
              density="compact"
              variant="outlined"
              v-model="selectedEmployee.title"></v-text-field>
            <v-text-field
              v-model="selectedEmployee.email"
              label="Email"
              density="compact"
              variant="outlined"
              readonly
              append-icon="mdi-lock"></v-text-field>

            <v-select
              label="Status"
              v-model="selectedEmployee.status"
              variant="outlined"
              :items="['Active', 'Inactive']"></v-select>
            <v-select
              label="Role"
              variant="outlined"
              v-model="selectedEmployee.roles"
              :items="roleOptions"
              clearable></v-select>
            <v-select
              v-if="isDepartmentAdmin"
              class="pl-2"
              label="Department"
              variant="outlined"
              v-model="selectedEmployee.department_admin_for"
              :items="departmentList"
              item-title="display_name"
              item-value="dept"
              clearable></v-select>
          </div>

          <div>
            <v-btn
              @click="doCreate"
              color="primary"
              class="float-left"
              :disabled="!isValid"
              >Add</v-btn
            >
            <v-btn
              @click="show = false"
              color="secondary"
              class="float-right"
              >Close</v-btn
            >
          </div>
          <div style="clear: both"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmployeeLookup from "./employeeLookup.vue";

export default {
  name: "CreateUserBtn",
  props: ["onSave"],
  components: { EmployeeLookup },
  data: () => ({
    roleOptions: ["System Admin", "Finance Admin", "Department Admin"],
    item: {},
    show: false,

    isEmployeeLoading: false,
    employeeItems: [],
    employeeSearch: "",

    employeeId: "",
    supervisorId: "",
    position: "",

    selectedEmployee: {},
    selectedSupervisor: {},
    supervisorTitle: "",
  }),
  computed: {
    isDepartmentAdmin: function () {
      return this.item.roles === "Department Admin";
    },
    ...mapGetters("department", ["departmentList"]),

    isValid() {
      if (this.selectedEmployee.email && this.selectedEmployee.title.length > 0)
        return true;

      return false;
    },
  },
  watch: {
    employeeSearch(val) {
      // Items have already been loaded
      if (val && val.length == 0) return;
      //if (this.employeeItems && this.employeeItems.length > 0) return;
      // Items have already been requested
      if (this.isEmployeeLoading) return;

      this.isEmployeeLoading = true;

      // Lazily load input items
      this.searchEmployees({ terms: val })
        .then((res) => {
          this.employeeItems = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isEmployeeLoading = false));
    },
  },

  mounted: async function () {},
  methods: {
    ...mapActions("employee", ["searchEmployees"]),
    ...mapActions("administration", ["createUser"]),

    async doShow() {
      // this.selectedEmployee = {};
      // this.selectedSupervisor = {};
      // this.supervisorId = "";
      this.position = "";
      // this.supervisorTitle = "";
    },
    async doCreate() {
      let resp = await this.createUser(this.selectedEmployee);
      this.$emit("update");
      this.show = false;
      this.onSave(resp);
    },
    pickEmployee(item) {
      this.selectedEmployee = item;
      this.position = this.selectedEmployee.title;
    },
    unselectEmployee() {
      this.selectedEmployee = {};
    },
    pickSupervisor(item) {
      this.selectedSupervisor = item;
      this.supervisorTitle = this.selectedSupervisor.title;
    },
    unselectSupervisor() {
      this.selectedSupervisor = {};
    },
  },
};
</script>
