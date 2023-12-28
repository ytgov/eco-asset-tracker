<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props">
        mdi-pencil
      </v-icon>
    </template>
    <link-personnel-card @close="dialog = !dialog"> </link-personnel-card>
  </v-dialog>
</template>

<script>
import linkPersonnelCard from "./linkPersonnelCard.vue";
export default {
  name: "linkPersonnelDialog",
  components: {
    linkPersonnelCard,
  },
  props: {},
  data: () => ({
    dialog: false,
  }),
};
</script>

<style></style>
