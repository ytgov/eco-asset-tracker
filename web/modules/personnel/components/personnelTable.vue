<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table-virtual
          :items="localItems"
          :search="search"
          :headers="localHeaders"
          @click:row="openPersonDetails"
          class="row-clickable"
          :loading="loading"
          @current-items="currentItems">
          <template v-slot:footer.prepend>
            <v-spacer />
          </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <download-csv
              :data="filteredPersonnel"
              :labels="headers"
              name="personnel.csv">
              <v-chip
                label
                variant="outlined"
                v-bind="props">
                <v-icon> mdi-download </v-icon>
              </v-chip>
            </download-csv>
          </template>
          <span>Download CSV</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash";
export default {
  name: "PersonnelTable",
  props: {
    search: {
      type: String,
      default: "",
    },

    all: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    editUser: null,
    filteredPersonnel: [],
    loading: true,
  }),

  computed: {
    localHeaders: function () {
      if (this.headers.length > 0) {
        return this.headers;
      } else {
        return [
          { title: "Name", value: "display_name" },
          { title: "Email", value: "email" },
          { title: "Title", value: "title" },
        ];
      }
    },
    localItems: function () {
      if (this.items && this.items != "all") {
        return this.items;
      } else {
        return this.employees;
      }
    },
    ...mapState("personnel", ["employees"]),
  },
  methods: {
    currentItems: function (value) {
      this.filteredPersonnel = value;
    },
    saveComplete(resp) {
      this.$refs.notifier.showAPIMessages(resp.data);
      this.loadUserList();
    },

    openPersonDetails(event, dataTableRow) {
      const { item } = dataTableRow;
      this.$router.push("/personnel/" + item.ynet_id);
    },
  },
  mounted() {
    this.loading = this.isLoading;
    this.loading = false;
  },
};
</script>

<style></style>
