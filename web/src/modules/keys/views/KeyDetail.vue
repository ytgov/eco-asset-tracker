<template>
  <v-container fluid>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    >
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>
    <v-row>
      <v-col cols="6">
        <v-toolbar dark :color="appbarColor">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-toolbar-title v-bind="attrs" v-on="on">
                Key Code
              </v-toolbar-title>
            </template>
            <span>ID: Key ID</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <slot name="top-right-action">
            <v-icon v-if="isAdmin && !edit" dark @click="doEdit()">
              mdi-pencil
            </v-icon>
            <v-icon v-else-if="isAdmin && edit" dark @click="doSave()">
              mdi-content-save
            </v-icon>
          </slot>
        </v-toolbar>
        <v-card tile>
          <v-card-text>
            <key-form-detail :edit.sync="edit"></key-form-detail>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="edit && isAdmin"
              dark
              color="yg_moss"
              @click="doSave()"
            >
              Save
            </v-btn>
            <v-btn v-else dark color="primary" @click="close()">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KeyFormDetail from "../components/keyDetailForm.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "",
  components: {
    KeyFormDetail
  },
  data: () => ({
    edit: false,
    headingStyle: "text-overline",
    page: {
      title: "Keys"
    },
    dialog: false
  }),
  created() {},
  computed: {
    keyID: function() {
      return this.$route.params.keyID;
    },
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Keys", to: "/keys", exact: true },
        { text: `${this.$route.params.keyID} ` }
      ];
    },
    ...mapGetters("administration/users", ["isAdmin"]),
    appbarColor() {
      let color = "";
      if (this.edit) color = "yg_sun";
      else color = "yg_twilight";
      return color;
    }
  },
  methods: {
    ...mapActions("keys", ["getKey", "saveKey"]),
    doEdit: function() {
      this.getKey(this.keyID);
      this.edit = true;
    },
    doSave: function() {
      this.saveKey(this.asset);
      this.edit = false;
    },
    close: function() {
      this.$router.push(`/keys`);
    }
  },
  async mounted() {
    // load key to store
    await this.getKey(this.keyID);
  }
};
</script>
