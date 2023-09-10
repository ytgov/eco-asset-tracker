<template>
  <v-container fluid>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    >
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>
    <BaseCard showHeader="true">
      <template v-slot:left>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>
      <template v-slot:right>
        <add-key-btn v-if="isAdmin"></add-key-btn>
      </template>

      <v-card>
        <keys-table :all="true" :search="search"></keys-table>
      </v-card>
    </BaseCard>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import AddKeyBtn from "../components/addKeyBtn.vue";
import KeysTable from "../components/keysTable.vue";

export default {
  name: "",
  components: {
    KeysTable,
    AddKeyBtn
  },
  data: () => ({
    search: "",
    page: {
      title: "Keys"
    },
    dialog: false
  }),
  created() {},
  computed: {
    ...mapGetters("administration/users", ["isAdmin"]),
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Keys" }
      ];
    }
  },
  methods: {
    closeRoomDetails() {
      this.dialog = false;
    }
  }
};
</script>
