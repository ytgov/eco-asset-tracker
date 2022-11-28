<template>
  <v-container>
    <div class="text-center" v-if="updatingPersonnel">
      <div class="font-italic text-subtitle-1 pb-10">
        Updating...
      </div>
      <div>
        <v-progress-circular
          align-center
          v-if="updatingPersonnel"
          :indeterminate="updatingPersonnel"
          color="primary"
          height="5"
        />
      </div>
    </div>
    <v-simple-table v-if="!updatingPersonnel">
      <tbody>
        <tr
          v-for="person in assignedPersonnel"
          :key="person.index"
          @click="goToRoom(person.ynet_id)"
        >
          <td class="text-body-2">{{ person.display_name }}</td>
          <td class="text-body-2">{{ person.title }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="text-center">
      <assign-personnel-btn
        v-if="edit && assignedPersonnel.length === 0 && !updatingPersonnel"
      />
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AssignPersonnelBtn from "./assignPersonnelBtn.vue";
export default {
  name: "linkedRoomsSimpleTable",
  components: { AssignPersonnelBtn },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    search: "",
    loading: true,
    message: "",
    assignments: {
      key: "",
      rooms: [],
    }, //the running list of who is assigned to this room
    overwrite: false,
    warn: false,
  }),
  computed: {
    ...mapState("keys", ["assignedPersonnel", "updatingPersonnel"]),
    headers: function() {
      return [
        { text: "Name", value: "name" },
        { text: "Type", value: "Purpose" },
      ];
    },
    keyID: function() {
      return this.$route.params.keyID;
    },
  },
  methods: {
    goToRoom(ynet_id) {
      this.$router.push("/personnel/" + ynet_id);
    },
  },
  async mounted() {},
};
</script>

<style></style>
