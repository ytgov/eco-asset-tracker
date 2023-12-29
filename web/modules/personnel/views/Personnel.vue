<template>
  <v-container
    fluid
    class="down-top-padding">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs">
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>

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
          v-if="isAdmin"
          ref="create-user-btn"
          :onSave="saveComplete"></create-user-btn>
      </template>
      <v-card class="default">
        <v-card-text>
          <personnel-table
            :search="search"
            :all="true"></personnel-table>
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
import { mapActions, mapState, mapGetters } from "vuex";
import userEditor from "../components/UserEditor.vue";
import CreateUserBtn from "../components/createUserBtn.vue";
import PersonnelTable from "../components/personnelTable.vue";

export default {
  name: "PersonnelPage",
  components: { userEditor, CreateUserBtn, PersonnelTable },

  data: () => ({
    page: { title: "Personnel" },

    search: "",
    isLoading: false,
    users: [],
    editUser: null,
  }),
  async mounted() {
    this.loadUserList();
  },
  computed: {
    localHeaders: function () {
      if (this.headers) {
        return this.headers;
      } else {
        return [
          { text: "Name", value: "display_name" },
          { text: "Email", value: "email" },
          { text: "Title", value: "title" },
        ];
      }
    },
    localItems: function () {
      if (this.items) {
        return this.items;
      } else {
        return this.employees;
      }
    },
    ...mapGetters("administration/users", ["isAdmin"]),
    ...mapState("personnel", ["employees"]),
    breadcrumbs: function () {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Personnel" },
      ];
    },
  },
  methods: {
    ...mapActions("personnel", ["loadUsers"]),
    async loadUserList() {
      // this.isLoading = true;
      // this.users = await this.loadUsers();
      // this.isLoading = false;
    },
    saveComplete(resp) {
      this.$refs.notifier.showAPIMessages(resp.data);
      this.loadUserList();
    },
    rowClick(item) {
      this.$refs.userEditor.show(_.clone(item));
    },
  },
};
</script>
