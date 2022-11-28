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

    <v-select v-model="key.status" label="Status" :items="keyStatuses">
    </v-select>

    <v-textarea v-model="key.notes" :rows="3" label="Notes" auto-grow>
    </v-textarea>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "KeyFormDetail",
  components: {},
  props: {
    edit: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    keyStatuses: ["Assigned", "Not assigned", "Obselete", "Lost", "Broken"],
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
      },
    },
  },
};
</script>

<style></style>
