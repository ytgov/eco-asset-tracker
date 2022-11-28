<template>
  <div>
    <v-card tile>
      <v-card-title>
        Rooms <v-spacer />
        <link-room-dialog v-if="edit" @close="close()"></link-room-dialog>
      </v-card-title>
      <div class="text-center">
        <v-progress-circular
          align-center
          v-if="loading"
          :indeterminate="loading"
          color="primary"
          height="5"
        />
      </div>

      <linked-rooms-simple-table
        :edit="edit"
        v-if="!loading"
      ></linked-rooms-simple-table>
    </v-card>
  </div>
</template>

<script>
import LinkRoomDialog from "./linkRoomDialog.vue";
import linkedRoomsSimpleTable from "./linkedRoomsSimpleTable.vue";
export default {
  name: "KeyRoomDetailsCard",
  components: {
    linkedRoomsSimpleTable,
    LinkRoomDialog,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
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
      this.close(); //replace with link asset methed (then close)
    },
  },
};
</script>

<style></style>
