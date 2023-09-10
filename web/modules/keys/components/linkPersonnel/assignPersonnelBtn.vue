<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" outlined v-bind="attrs" v-on="on">
        Assign Personnel
      </v-btn>
    </template>
    <link-personnel-card @close="dialog = !dialog"> </link-personnel-card>
  </v-dialog>
</template>

<script>
import linkPersonnelCard from "./linkPersonnelCard.vue";
export default {
  name: "assignPersonnelBtn",
  components: {
    linkPersonnelCard,
  },
  props: {},
  data: () => ({
    dialog: false,
  }),
  methods: {
    close: function() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
