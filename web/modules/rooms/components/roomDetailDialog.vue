<template>
  <v-dialog
    model-value="dialog"
    max-width="700px"
    @click:outside="close()">
    <template>
      <span> </span>
    </template>
    <room-card @close="close()">></room-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import RoomCard from "./roomCard";
export default {
  name: "roomDetailDialog",
  components: {
    RoomCard,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    readonly: true,
  }),
  computed: {
    ...mapState("rooms", ["currentRoom"]),
    appbarColor() {
      let color = "";
      if (!this.readonly) color = "yg_sun";
      else color = "yg_twilight";
      return color;
    },
  },
  methods: {
    ...mapActions("rooms", ["saveRoom", "clearRoom"]),
    edit: function () {
      //switch edit mode on or off
      this.readonly = !this.readonly;
    },
    close: function () {
      this.clearRoom();
      this.readonly = true;
      this.$emit("close");
    },
    save: function () {
      console.log(this.currentRooom);
      if (this.currentRooom._id) {
        this.createRoom();
      } else {
        this.saveRoom();
      }
      this.close();
    },
  },
};
</script>
