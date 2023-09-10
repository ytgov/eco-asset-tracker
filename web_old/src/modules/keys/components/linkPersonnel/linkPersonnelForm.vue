<template>
  <v-container>
    <v-text-field
      v-show="edit"
      class="pb-10 "
      v-model="search"
      prepend-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      clearable
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="employees"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.assigned="{ item }">
        <v-simple-checkbox
          @click="doAssignPersonnel(item)"
          :value="isAssigned(item.ynet_id)"
        >
        </v-simple-checkbox>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import linkPersonnelRoomDialog from "./linkPersonnelRoomDialog.vue";
export default {
  name: "linkRoomForm",
  components: {},
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    search: "",
    loading: true,
    message: "",
    assignments: {
      key: "",
      personnel: [],
    }, //the running list of who is assigned to this room
    overwrite: false,
    warn: false,
  }),
  computed: {
    ...mapState("keys", ["assignedPersonnel"]),
    ...mapState("personnel", ["employees"]),
    headers: function() {
      return [
        { text: "", value: "assigned" },
        { text: "Name", value: "display_name" },
        { text: "Title", value: "title" },
        { text: "Email", value: "email" },
      ];
    },
    keyID: function() {
      return this.$route.params.keyID;
    },
  },
  methods: {
    ...mapActions("keys", ["assignPersonnelToKey"]),
    cleanAssignments(personnelAssignments) {
      let y = {
        key: this.keyID,
        personnel: personnelAssignments.map((x) => {
          return x.ynet_id;
        }),
      };
      return y;
    },
    // ...mapActions("keys", ["getAssignedRoomKeys"]),
    isAssigned: function(person) {
      if (this.assignments.personnel.findIndex((p) => p === person) > -1) {
        return true;
      }
      return false;
    },
    doAssignPersonnel: async function(item) {
      if (this.isAssigned(item.ynet_id)) {
        let newList = this.assignments.personnel.filter(
          (p) => p != item.ynet_id
        );

        this.assignments.personnel = newList;
      } else {
        this.assignments.personnel.push(item.ynet_id);
      }

      this.assignPersonnelToKey(this.assignments);
    },
  },
  async mounted() {
    this.assignments = await this.cleanAssignments(this.assignedPersonnel);
    this.loading = false;
  },
};
</script>

<style></style>
