<template>
  <v-card tile>
    <v-toolbar>
      <v-toolbar-title>
        Infrastructure
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon v-if="isAdmin">
        mdi-plus
      </v-icon>
    </v-toolbar>

    <v-card-text>
      <p>A list of infrastructure (a subset of assets) assigned to the room</p>

      <!-- <v-data-table
      :headers="headers"
      dense
      :search="search"
      :items="infrastructure"
      :loading="loading">
    </v-data-table> -->
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "RoomTable",
  components: {},
  props: {
    search: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
    loading: true,
    dialog: false
  }),
  computed: {
    ...mapGetters("administration/users", ["isAdmin"]),
    headers: function() {
      return [
        { text: "Name", value: "name" },
        { text: "Purpose", value: "purpose" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" }
      ];
      // return Object.keys(this.rooms)
    }
  },
  mounted: async function() {
    this.loading = false;
  },
  methods: {}
};
</script>
