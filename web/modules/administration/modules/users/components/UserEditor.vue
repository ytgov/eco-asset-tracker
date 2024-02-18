<template>
  <v-dialog
    persistent
    v-model="showDialog"
    width="600">
    <v-toolbar color="primary">
      <v-toolbar-title>Edit User</v-toolbar-title>
      <slot name="top-right-action">
        <v-btn>
          <v-icon
            title="Close"
            @click="showDialog = false"
            >mdi-close</v-icon
          >
        </v-btn>
      </slot> </v-toolbar
    ><v-card rounded="0">
      <v-card-text class="mt-5 pb-0">
        <v-text-field
          v-model="item.display_name"
          label="Name"
          density="compact"
          variant="outlined"
          readonly
          append-icon="mdi-lock"></v-text-field>
        <v-text-field
          v-model="item.email"
          label="Email"
          density="compact"
          variant="outlined"
          readonly
          append-icon="mdi-lock"></v-text-field>
        <v-select
          label="Status"
          v-model="item.status"
          density="compact"
          variant="outlined"
          :items="['Active', 'Inactive']"></v-select>
        <v-select
          label="Role"
          density="compact"
          variant="outlined"
          v-model="item.roles"
          :items="roleOptions"
          clearable></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="save"
          color="primary"
          variant="tonal"
          >Save</v-btn
        ></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserEdtior",
  props: ["onSave"],
  data: () => ({
    showDialog: false,
    item: {},
    roleOptions: ["System Admin", "Editor", "User"],
  }),
  computed: {},
  methods: {
    ...mapActions("administration/users", ["saveUser"]),
    show(item) {
      this.item = item;
      this.showDialog = true;
    },
    async save() {
      let resp = await this.saveUser(this.item);
      console.log(resp);
      this.showDialog = false;
    },
  },
};
</script>
