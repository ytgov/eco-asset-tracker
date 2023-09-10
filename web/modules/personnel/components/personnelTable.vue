<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table
          :items="localItems"
          :search="search"
          :headers="localHeaders"
          @click:row="rowClick"
          class="row-clickable"
          :loading="loading"
          @current-items="currentItems"
        >
          <template v-slot:footer.prepend>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <download-csv
                  :data="filteredPersonnel"
                  :labels="headers"
                  name="personnel.csv"
                >
                  <v-chip label outlined v-on="on" v-bind="attrs">
                    <v-icon>
                      mdi-download
                    </v-icon>
                  </v-chip>
                </download-csv>
              </template>
              <span>Download CSV</span>
            </v-tooltip>
          </template>
        </v-data-table>
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
    localHeaders: function() {
      if (this.headers.length > 0) {
        return this.headers;
      } else {
        return [
          { text: "Name", value: "display_name" },
          { text: "Email", value: "email" },
          { text: "Title", value: "title" },
        ];
      }
    },
    localItems: function() {
      if (this.items && this.items != "all") {
        return this.items;
      } else {
        return this.employees;
      }
    },
    ...mapState("personnel", ["employees"]),
  },
  methods: {
    currentItems: function(value) {
      this.filteredPersonnel = value;
    },
    saveComplete(resp) {
      this.$refs.notifier.showAPIMessages(resp.data);
      this.loadUserList();
    },
    rowClick(item) {
      //set current employee to the item...

      //then go to the employee details page
      this.$router.push("/personnel/" + item.ynet_id);
      // this.$refs.userEditor.show(_.clone(item));
    },
  },
  mounted() {
    this.loading = this.isLoading;
    this.loading = false;
  },
};
</script>

<style></style>
