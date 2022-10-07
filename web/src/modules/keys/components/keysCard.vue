<template>
  <v-card tile>
    <v-toolbar>
      <v-toolbar-title>
        Keys
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-icon v-if="isAdmin">
        mdi-plus
      </v-icon> -->
    </v-toolbar>

    <!-- <v-card-text> -->
    <keys-table :items="items" :headers="headers"></keys-table>

    <!-- </v-card-text> -->
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import KeysTable from "./keysTable.vue";
export default {
  name: "keysCard",
  components: {
    KeysTable
  },
  props: {
    search: {
      type: String,
      default: ""
    },
    roomID: {
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
    ...mapGetters("keys", ["getKeysByRoom"]),
    items: function() {
      return this.getKeysByRoom(this.roomID);
    },
    headers: function() {
      return [
        { text: "Key Code", value: "code" },
        { text: "Key Number", value: "number" }, // <- not required if shown in the context of a room
        { text: "Status", value: "status" },
        { text: "Assigned to", value: "assignedTo" }
      ];
    }
  },
  mounted: async function() {
    this.loading = false;
  },
  methods: {}
};
</script>
