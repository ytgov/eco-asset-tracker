<template>
  <v-form
    v-model="valid"
    ref="form"
    :lazy-validation="true"
    :validate-on-blur="false"
    :validate-on-change="false"
  >
    <v-row class="pt-5">
      <v-col cols="3">
        <v-switch
          class=""
          v-model="asset.active"
          :label="activeLabel.text"
          :color="activeLabel.color"
          inset
        ></v-switch>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col>
        <v-text-field
          v-model="asset.assetNum"
          label="Asset Number"
          :rules="[rules.required]"
          :readonly="!edit"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="asset.type"
          :items="allTypes"
          label="Type"
          :rules="[rules.required]"
          :readonly="!edit"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="asset.make" label="Make" :readonly="!edit">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="asset.model"
          label="Model"
          :readonly="!edit"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="asset.description"
          label="Description"
          :readonly="!edit"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="asset.purchaseDate"
              label="Purchase Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="asset.purchaseDate"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="asset.installDate"
              label="Installed Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="asset.installDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span class="subtitle-1">Assigments</span>
          </v-card-title>
          <v-card-text>
            <v-tabs>
              <v-tab>
                Room
              </v-tab>
              <v-tab-item>
                <v-autocomplete
                  v-if="edit"
                  v-model="asset.room"
                  :items="rooms"
                  item-value="_id"
                  item-text="name"
                ></v-autocomplete>

                <div class="text-subtitle-1 d-flex pl-5 pt-5">
                  {{ roomName(asset.room) }}
                </div>
              </v-tab-item>
              <v-tab>
                Person
              </v-tab>
            </v-tabs>
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
          :readonly="!edit"
        >
          ></v-autocomplete
        >
      </v-col>
      <v-col>
        <v-textarea
          v-model="asset.statusReason"
          :rows="3"
          label="Status Reason"
          auto-grow
          :readonly="!edit"
        >
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
export default {
  name: "AssetDetailForm",
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
    items: ["Tablet", "Desktop"],
    // asset: {
    //   type: "",
    //   assetNum: "",
    //   make: "",
    //   model: "",
    //   description: "",
    //   purchaseDate: "",
    //   installDate: "",
    //   assignedTo: "",
    //   status: "",
    //   statusReason: ""
    // },
    // assetTypes: ["Computer", "Printer", "Monitor", "Scanner", "Phone", "Other"],
    statuses: ["Active", "Inactive", "Broken", "Lost"],
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
    activeLabel: function() {
      if (this.asset.active == true) {
        return { text: "Active", color: "yg_moss" };
      } else {
        return { text: "Inactive", color: "red" };
      }
    },
  },
  methods: {
    roomName: function(roomID) {
      //find the room in the list of rooms and return the name of the room matching roomID
      if (roomID && this.rooms.length > 0) {
        return this.rooms.find((room) => room._id == roomID).name;
      }
      return "";
    },
  },
};
</script>
