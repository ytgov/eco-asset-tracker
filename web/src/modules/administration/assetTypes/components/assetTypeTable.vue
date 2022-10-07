<template>
  <v-data-table :headers="headers" :items="assetTypes"> </v-data-table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "assetTypeTable",
  data: () => ({
    headers: [
      {
        text: "Asset Name",
        value: "name"
      },
      {
        text: "Office",
        value: "office"
      },
      {
        text: "Person",
        value: "person"
      },
      {
        text: "Infrastructure",
        value: "infrastructure"
      }
    ]
  }),
  computed: {
    ...mapState("administration/assets", ["assetTypes"])
  },
  methods: {},
  async mounted() {
    if (this.assetTypes.length === 0) {
      console.warn("No asset types found");
    }
  }
};
</script>
