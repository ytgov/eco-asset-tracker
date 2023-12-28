<template>
  <div>
    <v-toolbar dark :color="appbarColor">
      <v-tooltip location="right">
        <template v-slot:activator="{ props }">
          <v-toolbar-title v-bind="props">
            {{ currentRoom.name }}
          </v-toolbar-title>
        </template>
        <span>ID: {{ currentRoom._id }}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <slot name="top-right-action">
        <v-icon v-if="isAdmin && readonly" dark @click="edit">
          mdi-pencil
        </v-icon>
        <v-icon v-else-if="isAdmin && !readonly" dark @click="save">
          mdi-content-save
        </v-icon>
      </slot>
    </v-toolbar>

    <v-card rounded="0">
      <v-card-text>
        <v-text-field :clearable="clearable" v-model="currentRoom.name" label="Name" density="compact" v-if="!readonly">
        </v-text-field>
        <!-- <v-text-field
          :clearable="clearable"
          v-model="currentRoom.branchID"
          label="Branch"
          :readonly="readonly"
          dense
        >
        </v-text-field> -->
        <v-autocomplete label="Purpose" v-model="currentRoom.purpose" :items="purposes" :readonly="readonly">
        </v-autocomplete>
        <v-autocomplete label="Status" v-model="currentRoom.status" :items="statuses" :readonly="readonly">
        </v-autocomplete>
        <v-text-field :clearable="clearable" v-model="currentRoom.size" label="Size" :readonly="readonly"
          density="compact">
        </v-text-field>
        <v-textarea :clearable="clearable" v-model="currentRoom.notes" label="Notes" density="compact"
          :readonly="readonly" rows="2" auto-grow>
        </v-textarea>
      </v-card-text>

      <v-divider></v-divider>
      <slot name="actions">
        <v-card-actions v-if="!readonly">
          <v-spacer></v-spacer>
          <!-- <v-btn
            v-if="user.admin"
            color="yg_lichen"
            dark
            @click="del()">
              Delete
          </v-btn> -->
          <!-- <v-btn
            v-if="readonly"
            color="primary"
            @click="close()"
          >
            Close
          </v-btn> -->
          <v-btn v-if="isAdmin && !readonly" color="primary" @click="save()">
            Save
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "roomCard",
  components: {},
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    _id: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    readonly: true,
    purposes: [],
    statuses: []
  }),

  computed: {
    ...mapState("rooms", ["currentRoom"]),
    ...mapGetters("administration/users", ["isAdmin"]),
    clearable() {
      return !this.readonly;
    },
    appbarColor() {
      let color = "";
      if (!this.readonly) color = "yg_sun";
      else color = "yg_twilight";
      return color;
    }
  },
  methods: {
    ...mapActions("rooms", [
      "saveRoom",
      "clearRoom",
      "createRoom",
      "deleteRoom",
      "getRoom",
      "getRoomPurposes",
      "getRoomStatuses"
    ]),
    edit: function () {
      //switch edit mode on or off
      this.readonly = !this.readonly;
    },
    close: function () {
      this.clearRoom();
      this.readonly = true;
      this.$emit("close");
    },
    save: async function () {
      await this.saveRoom();
      this.readonly = true;
    },
    del: async function () {
      await this.deleteRoom(this.currentRoom._id);
      this.close();
    }
  },
  async mounted() {
    this.purposes = Object.keys(await this.getRoomPurposes());
    this.statuses = Object.keys(await this.getRoomStatuses());
  }
};
</script>

<style></style>
