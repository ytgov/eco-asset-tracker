<template>
  <v-form
    v-model="valid"
    ref="form"
    :lazy-validation="true"
    :validate-on-blur="false"
    :validate-on-change="false">
    <v-row class="pt-5">
      <v-col cols="3">
        <v-switch
          class=""
          v-model="asset.active"
          :label="activeLabel.text"
          :color="activeLabel.color"
          inset></v-switch>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col>
        <v-text-field
          v-model="asset.assetNum"
          label="Asset Number"
          :rules="[rules.required]"
          :readonly="!edit"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="asset.type"
          :items="allTypes"
          label="Type"
          :rules="[rules.required]"
          :readonly="!edit"></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="asset.make"
          label="Make"
          :readonly="!edit">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="asset.model"
          label="Model"
          :readonly="!edit"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="asset.description"
          label="Description"
          :readonly="!edit"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-menu
          v-model="menu"
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          min-width="auto">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="asset.purchaseDate"
              label="Purchase Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="asset.purchaseDate"
            @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          min-width="auto">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="asset.installDate"
              label="Installed Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="asset.installDate"
            @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span class="text-h6">Assigments</span>
          </v-card-title>
          <v-card-text>
            <v-tabs v-model="activeTab">
              <v-tab value="Room"> Room </v-tab>
              <v-tab value="Person"> Person</v-tab>
            </v-tabs>

            <v-window v-model="activeTab">
              <v-window-item value="Room">
                <v-autocomplete
                  class="mt-3"
                  v-if="edit"
                  v-model="asset.room"
                  :items="rooms"
                  item-value="_id"
                  item-title="name"></v-autocomplete>

                <div class="text-subtitle-1 d-flex pl-5 pt-5">
                  {{ roomName(asset.room) }}
                </div>
              </v-window-item>

              <v-window-item value="Person">
                <asset-person-assignment-widget :edit="edit">
                </asset-person-assignment-widget>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="asset.status"
          :items="statuses"
          label="Status"
          :readonly="!edit">
          ></v-autocomplete
        >
      </v-col>
      <v-col>
        <v-textarea
          v-model="asset.statusReason"
          :rows="3"
          label="Status Reason"
          auto-grow
          :readonly="!edit">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import assetPersonAssignmentWidget from "./linkPerson/assetPersonAssignmentWidget.vue";
export default {
  name: "AssetDetailForm",
  components: {
    assetPersonAssignmentWidget,
  },

  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
    },
    valid: true,
    DumbRoom: null,
    menu: false,
    menu2: false,
    showPersonAssignment: false,
    statuses: ["Active", "Inactive", "Broken", "Lost"],
    activeTab: null,
  }),
  computed: {
    ...mapGetters("administration/assetTypes", ["allTypes"]),
    ...mapState("assets", ["currentAsset"]),
    ...mapState("rooms", ["rooms"]),

    asset: {
      get() {
        return this.currentAsset;
      },
      set(value) {
        this.$store.commit("assets/SET_ASSET", value);
      },
    },
    activeLabel: function () {
      if (this.asset.active == true) {
        return { text: "Active", color: "yg_moss" };
      } else {
        return { text: "Inactive", color: "red" };
      }
    },
  },
  methods: {
    roomName: function (roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find((room) => room._id == roomID).name;
      }
      return "";
    },
  },
};
</script>
