<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">
        mdi-pencil
      </v-icon>
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
    close: function() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
