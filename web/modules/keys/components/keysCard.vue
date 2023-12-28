<template>
  <v-card rounded="0">
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "keysCard",
  components: {
    // KeysTable,
  },
  props: {
    search: {
      type: String,
      default: "",
    },
    roomID: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    // formAItems: [],
    // loadingFormA: false,
    loading: true,
    dialog: false,
    items: [],
  }),

  computed: {
    ...mapGetters("administration/users", ["isAdmin"]),
    ...mapGetters("keys", ["getKeysByRoom"]),
    // items: function() {
    //   return this.getKeysByRoom(this.roomID);
    // },
    headers: function () {
      return [
        { text: "Key Code", value: "code" },
        { text: "Key Number", value: "number" }, // <- not required if shown in the context of a room
        // { text: "Status", value: "status" },
        { text: "Assigned People", value: "assignedUsers" },
      ];
    },
  },
  mounted: async function () {
    this.items = await this.getAssignedKeys(this.roomID);
    this.loading = false;
  },
  methods: {
    ...mapActions("rooms", ["getAssignedKeys"]),
  },
};
</script>
