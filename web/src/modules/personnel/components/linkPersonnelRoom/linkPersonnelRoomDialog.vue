<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">
        mdi-pencil
      </v-icon>
    </template>
    <link-personnel-room-card @close="dialog = !dialog">
    </link-personnel-room-card>
  </v-dialog>
</template>

<script>
import linkPersonnelRoomCard from "./linkPersonnelRoomCard.vue";
export default {
  name: "linkPersonnelRoomDialog",
  components: {
    linkPersonnelRoomCard,
  },
  props: {},
  data: () => ({
    dialog: false,
  }),
};
</script>

<style></style>
