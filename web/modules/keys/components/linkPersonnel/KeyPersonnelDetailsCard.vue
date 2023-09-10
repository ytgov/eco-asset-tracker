<template>
  <div>
    <v-card>
      <v-card-title>
        Assigned Personnel <v-spacer />
        <link-personnel-dialog
          v-if="edit"
          @close="close()"
        ></link-personnel-dialog>
      </v-card-title>
      <linked-personnel-simple-table
        :edit="edit"
        v-if="!loading"
      ></linked-personnel-simple-table>
      <div class="text-center pb-7">
        <v-progress-circular
          align-center
          v-if="loading"
          :indeterminate="loading"
          color="primary"
          height="5"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import LinkPersonnelDialog from "./linkPersonnelDialog.vue";
import linkedPersonnelSimpleTable from "./linkedPersonnelSimpleTable.vue";
export default {
  name: "KeyRoomDetailsCard",
  components: {
    linkedPersonnelSimpleTable,
    LinkPersonnelDialog,
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
