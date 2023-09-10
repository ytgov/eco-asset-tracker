<template>
  <div>
    <v-autocomplete
      v-model="person"
      :items="employees"
      item-text="display_name"
      item-value="ynet_id"
      @change="$emit('change')"
      clearable
      label="Person"
    >
    </v-autocomplete>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "assetPersonAutocomplete",
  data: () => ({
    hint: "Choose a person",
  }),

  computed: {
    ...mapState("assets", ["currentAsset"]),
    ...mapState("personnel", ["employees"]),

    person: {
      get() {
        return this.$store.state.assets.currentAsset.person;
      },
      set(value) {
        this.$store.commit("assets/SET_ASSET_PERSON", value);
      },
    },
  },
  methods: {},
};
</script>

<style></style>
