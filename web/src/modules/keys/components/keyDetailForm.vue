<template>
  <v-form :readonly="!edit">
    <v-text-field
      v-model="key.code"
      label="Key Code"
      hint="The white tag attached to the key"
    >
    </v-text-field>
    <v-text-field
      v-model="key.number"
      label="Key Number"
      hint="The code stamped on the key"
    >
    </v-text-field>
    <v-autocomplete
      v-model="key.room"
      label="Rooms"
      :items="rooms"
      item-text="name"
      item-value="_id"
    >
    </v-autocomplete>
    <v-select v-model="key.status" label="Status" :items="keyStatuses">
    </v-select>
    <v-text-field v-model="key.assignedUser" label="Assigned to">
    </v-text-field>
    <v-textarea v-model="key.notes" :rows="3" label="Notes" auto-grow>
    </v-textarea>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "KeyFormDetail",
  props: {
    edit: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    keyStatuses: ["Assigned", "Not assigned", "Obselete", "Lost", "Broken"]
  }),
  computed: {
    ...mapState("rooms", ["rooms"]),
    ...mapState("keys", ["currentKey"]),
    keyID: function() {
      return this.$route.params.keyID;
    },
    key: {
      get() {
        return this.currentKey;
      },
      set(value) {
        this.$store.commit("assets/SET_ASSET", value);
      }
    }
  }
};
</script>

<style></style>
