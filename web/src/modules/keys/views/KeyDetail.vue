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
      <v-col cols="8">
        <v-toolbar dark :color="appbarColor">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-toolbar-title v-bind="attrs" v-on="on">
                Details for Key {{ keyID }}
              </v-toolbar-title>
            </template>
            <span>ID: Key ID</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <slot name="top-right-action">
            <v-icon v-if="isEditor && !edit" dark @click="doEdit()">
              mdi-pencil
            </v-icon>
            <v-icon v-else-if="isEditor && edit" dark @click="doSave()">
              mdi-content-save
            </v-icon>
          </slot>
        </v-toolbar>
        <v-card tile class="">
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <key-form-detail :edit.sync="edit"></key-form-detail>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col>
                    <!-- Key to People -->
                    <key-personnel-details-card
                      :edit="edit"
                      :loading="loading"
                    ></key-personnel-details-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <!-- Key to Rooms  -->

                    <key-room-details-card :edit="edit" :loading="loading">
                    </key-room-details-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="edit && isEditor"
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
      <v-col cols="6">
        <v-row>
          <v-col> </v-col>
        </v-row>
        <v-row>
          <v-col> </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KeyFormDetail from "../components/keyDetailForm.vue";
import { mapActions, mapGetters } from "vuex";
import KeyRoomDetailsCard from "../components/linkRoom/KeyRoomDetailsCard.vue";
import KeyPersonnelDetailsCard from "../components/linkPersonnel/KeyPersonnelDetailsCard.vue";
export default {
  name: "",
  components: {
    KeyFormDetail,
    KeyRoomDetailsCard,
    KeyPersonnelDetailsCard,
  },
  data: () => ({
    edit: false,
    headingStyle: "text-overline",
    page: {
      title: "Keys",
    },
    dialog: false,
    things: [],
    loading: true,
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
        { text: `${this.$route.params.keyID} ` },
      ];
    },
    ...mapGetters("administration/users", ["isEditor"]),
    appbarColor() {
      let color = "";
      if (this.edit) color = "yg_sun";
      else color = "yg_twilight";
      return color;
    },
  },
  methods: {
    ...mapActions("keys", [
      "getKey",
      "saveKey",
      "getAssignedRoomKeys",
      "getAssignedPersonnelKeys",
    ]),
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
    },
  },
  async mounted() {
    this.loading = true;

    await this.getKey(this.keyID);

    await this.getAssignedRoomKeys();
    await this.getAssignedPersonnelKeys();

    this.loading = false;
  },
};
</script>
