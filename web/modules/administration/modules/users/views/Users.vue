<template>
  <v-container
    fluid
    class="down-top-padding">
    <!-- <admin-sidebar></admin-sidebar> -->

    <BaseCard show-header="true">
      <template v-slot:left>
        <v-text-field
          v-model="search"
          hide-details
          bg-color="white"
          label="Search"
          prepend-icon="mdi-magnify"
          :loading="isLoading"
          clearable></v-text-field>
      </template>
      <template v-slot:right>
        <create-user-btn
          ref="create-user-btn"
          :onSave="saveComplete"></create-user-btn>
      </template>

      <v-card class="default">
        <v-card-text>
          <v-data-table
            :items="userList"
            :search="search"
            :headers="[
              { text: 'Name', value: 'display_name' },
              { text: 'Email', value: 'email' },
              { text: 'Status', value: 'status' },
              { text: 'Roles', value: 'roles' },
            ]"
            @click:row="rowClick"
            class="row-clickable"
            :loading="isLoading"></v-data-table>
        </v-card-text>
      </v-card>
    </BaseCard>

    <user-editor
      ref="userEditor"
      :onSave="saveComplete"></user-editor>
    <notifications ref="notifier"></notifications>
  </v-container>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState } from "vuex";
import userEditor from "../components/UserEditor.vue";
import CreateUserBtn from "../components/createUserBtn.vue";

export default {
  name: "SystemUsers",
  components: { userEditor, CreateUserBtn },
  data: () => ({
    page: { title: "Manage Users" },
    breadcrumbs: [
      { text: "Administration", to: "/administration", exact: true },
      { text: "Manage users", disabled: true },
    ],
    search: "",
    isLoading: false,
    // users: [],
    editUser: null,
  }),
  async mounted() {
    this.getAllUsers();
  },
  computed: {
    ...mapState("administration/users", ["userList"]),
  },
  methods: {
    ...mapActions("administration/users", ["getAllUsers"]),
    async loadUserList() {
      this.isLoading = true;
      await this.getAllUsers();
      this.isLoading = false;
    },
    saveComplete(resp) {
      this.$refs.notifier.showAPIMessages(resp.data);
      this.loadUserList();
    },
    rowClick(event, dataTableRow) {
      const { item } = dataTableRow;
      this.$refs.userEditor.show(_.clone(item));
    },
  },
};
</script>
