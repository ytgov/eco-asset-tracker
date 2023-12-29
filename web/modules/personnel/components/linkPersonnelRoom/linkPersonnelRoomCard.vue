<template>
  <div>
    <v-toolbar
      dark
      :color="appbarColor">
      <v-toolbar-title> Link Personnel to Room </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="close()"> mdi-close </v-icon>
    </v-toolbar>
    <v-card rounded="0">
      <v-card-actions>
        <!-- <span class="text-h4">{{ room.name }}</span> -->
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text>
        <link-personnel-room-form></link-personnel-room-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="yg_blue"
          class="mr-3"
          variant="tonal"
          @click="save()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import linkPersonnelRoomForm from "./linkPersonnelRoomForm.vue";
export default {
  name: "linkPersonnelRoomCard",
  components: {
    linkPersonnelRoomForm,
  },
  data: () => ({}),
  computed: {
    appbarColor: function () {
      return "yg_moss";
    },
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    save: function () {
      this.close(); //replace with link asset methed (then close)
    },
  },
};
</script>

<style></style>
