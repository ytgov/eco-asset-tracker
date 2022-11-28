<template>
  <div>
    <v-card>
      <v-card-title>
        Rooms <v-spacer />
        <v-icon @click="close()">
          mdi-close
        </v-icon>
      </v-card-title>

      <link-room-form :edit="edit"></link-room-form>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import linkRoomForm from "./linkRoomForm.vue";
export default {
  name: "linkRoomCard",
  components: {
    linkRoomForm,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    appbarColor: function() {
      // return "yg_moss";
      return "";
    },
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    save: function() {
      this.close();
    },
  },
};
</script>

<style></style>
