<template>
  <!-- <room-detail-dialog>
     <template v-slot:content> -->
  <v-dialog max-width="600" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="clearRoom()">
        Add
      </v-btn>
    </template>
    <div>
      <notifications ref="notifier"></notifications>
      <v-toolbar dark :color="appbarColor">
        <v-toolbar-title> Create new room - {{ room.name }} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="close()">
          mdi-close
        </v-icon>
      </v-toolbar>
      <v-card tile>
        <v-card-actions>
          <span class="text-h4">{{ room.name }}</span>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-text>
          <!-- <v-text-field
            v-model=currentRoom._id
            label="ID"
            dense
            readonly
            class="pt-5">
          </v-text-field> -->

          <v-text-field
            v-model="room.name"
            label="Name"
            dense
            :rules="[rules.required]"
          >
          </v-text-field>
          <!-- <v-text-field v-model="room.branchID" label="Branch" dense>
          </v-text-field> -->
          <v-autocomplete
            label="Purpose"
            v-model="room.purpose"
            :items="purposes"
            :readonly="readonly"
            dense
          >
          </v-autocomplete>
          <v-autocomplete
            label="Status"
            v-model="room.status"
            :items="statuses"
            :readonly="readonly"
            dense
          >
          </v-autocomplete>
          <v-text-field v-model="room.size" label="Size" dense> </v-text-field>
          <v-textarea
            v-model="room.notes"
            label="Notes"
            dense
            rows="1"
            auto-grow
          >
          </v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="yg_moss" @click="create()">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
  <!-- </template>

  </room-detail-dialog> -->
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AddRoomBtn",
  components: {},
  data: () => ({
    dialog: false,
    rules: {
      required: value => !!value || "Required."
    },
    room: {
      // _id: "",
      name: "",
      branchID: "",
      purpose: "",
      notes: "",
      size: "",
      status: ""
    },
    appbarColor: "yg_moss",
    readonly: false,
    purposes: [],
    statuses: []
  }),
  methods: {
    ...mapActions("rooms", [
      "createRoom",
      "getRoomPurposes",
      "getRoomStatuses"
    ]),

    close: function() {
      this.dialog = false;
    },
    clearRoom: function() {
      this.room = {
        // _id: "",
        name: "",
        branchID: "",
        purpose: "",
        notes: "",
        size: "",
        status: ""
      };
    },

    create: async function() {
      if (this.room.name) {
        await this.createRoom(this.room);
      } else {
        console.log("A name is required in order to create a new room");
        // Notifier... need a name to save....
      }
      this.close();
    }
  },
  mounted: async function() {
    this.purposes = Object.keys(await this.getRoomPurposes());
    this.statuses = Object.keys(await this.getRoomStatuses());
  }
};
</script>
