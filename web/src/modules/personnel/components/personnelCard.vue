<template>
  <v-card tile>
    <v-toolbar>
      <v-toolbar-title>
        Personel
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon v-if="isAdmin">
        mdi-plus
      </v-icon>
    </v-toolbar>

    <v-card-text>
      <p>These are people who are assigned to the room.</p>

      <!-- <v-data-table
      :headers="headers"
      dense
      :search="search"
      :items="personel"
      :loading="loading">
    </v-data-table> -->
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "personelCard",
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
