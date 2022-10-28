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
      <v-col>
        <BaseCard class="default">
          <v-row justify="space-between">
            <v-col cols="4">
              <room-card>
                <!-- <template v-slot:top-right-action>
            <v-icon>
              mdi-pencil
            </v-icon>
          </template> -->
              </room-card>
            </v-col>

            <v-col cols="6">
              <personnel-card> </personnel-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <assets-card :roomID="this.roomID"></assets-card>
            </v-col>
            <v-col cols="4">
              <keys-card :roomID="this.roomID"></keys-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <infrastructure-card :roomID="this.roomID"> </infrastructure-card>
            </v-col>
          </v-row>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import roomCard from "../components/roomCard.vue";
import { mapActions, mapState } from "vuex";
import InfrastructureCard from "../../assets/components/infrastructure/infrastructureCard.vue";
import personnelCard from "@/modules/personnel/components/personnelCard.vue";
import AssetsCard from "../../assets/components/assetsCard.vue";
import KeysCard from "@/modules/keys/components/keysCard.vue";
export default {
  name: "",
  components: {
    roomCard,
    InfrastructureCard,
    personnelCard,
    AssetsCard,
    KeysCard,
  },
  data: () => ({
    headingStyle: "text-overline",
    page: {
      title: "Room Details",
    },
    // breadcrumbs: [],
    dialog: false,
  }),
  created() {},
  computed: {
    ...mapState("rooms", ["currentRoom"]),

    roomID: function() {
      return this.$route.params.roomID;
    },
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Rooms", to: "/rooms", exact: true },
        { text: `${this.currentRoom.name}` },
      ];
    },
  },
  methods: {
    ...mapActions("rooms", ["getRoom"]),
  },
  mounted() {
    this.getRoom(this.roomID);

    //load room to store
  },
};
</script>
