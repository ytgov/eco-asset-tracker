<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" variant="outlined" v-bind="props">
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
    close: function () {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
