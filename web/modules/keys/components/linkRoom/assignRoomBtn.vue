<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" variant="outlined" v-bind="props">
        Assign Rooms
      </v-btn>
    </template>
    <link-room-card @close="dialog = !dialog"> </link-room-card>
  </v-dialog>
</template>

<script>
import linkRoomCard from "./linkRoomCard.vue";
export default {
  name: "linkRoomDialog",
  components: {
    linkRoomCard,
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
