<template>
  <v-container fluid>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs">
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>
    <v-row>
      <v-col cols="6">
        <v-toolbar
          dark
          :color="appbarColor">
          <v-tooltip location="right">
            <template v-slot:activator="{ props }">
              <v-toolbar-title v-bind="props">
                {{ asset.assetNum }}
              </v-toolbar-title>
            </template>
            <span>ID: {{ asset._id }}</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <slot name="top-right-action">
            <v-icon
              v-if="isAdmin && readonly"
              dark
              @click="edit()">
              mdi-pencil
            </v-icon>
            <v-icon
              v-else-if="isAdmin && !readonly"
              dark
              @click="save()">
              mdi-content-save
            </v-icon>
          </slot>
        </v-toolbar>
        <v-card rounded="0">
          <v-card-text>
            <asset-detail-form :edit="!readonly"></asset-detail-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!readonly && isAdmin"
              variant="tonal"
              color="yg_moss"
              @click="save()">
              Save
            </v-btn>
            <v-btn
              v-else
              variant="tonal"
              color="primary"
              @click="close()">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbarOpen"> </v-snackbar>
  </v-container>
</template>

<script>
import AssetDetailForm from "../components/assetDetailForm.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "AssetDetailPage",
  components: {
    AssetDetailForm,
  },
  data: () => ({
    readonly: true,
    headingStyle: "text-overline",
    page: {
      title: "Aseset Detail",
    },
    dialog: false,
    snackbarOpen: false,
  }),
  computed: {
    appbarColor() {
      let color = "";
      if (!this.readonly) color = "yg_sun";
      else color = "yg_twilight";
      return color;
    },
    assetID: function () {
      return this.$route.params.assetID;
    },
    ...mapState("assets", ["currentAsset"]),
    ...mapState("rooms", ["rooms"]),
    ...mapGetters("administration/users", ["isAdmin"]),
    asset: function () {
      return this.currentAsset;
    },

    breadcrumbs: function () {
      return [
        { title: "Home", to: "/dashboard", exact: true },
        { title: "Assets", to: "/assets", exact: true },
        { title: `${this.$route.params.assetID} ` },
      ];
    },
  },
  methods: {
    ...mapActions("rooms", ["getAllRooms"]),
    ...mapActions("assets", ["getAsset", "saveAsset"]),
    edit: function () {
      if (this.rooms.length == 0) {
        this.getAllRooms();
      }

      this.readonly = false;
    },
    save: function () {
      this.saveAsset(this.asset);
      this.readonly = true;
    },
    close: function () {
      this.$router.push(`/assets`);
    },
  },
  mounted() {
    // this.getRoom(this.room);
    this.getAsset(this.$route.params.assetID);

    //load room to store
  },
};
</script>
